(function (ng) {
    'use strict';

    var Report = function (module, action, evolution, name)
        {
            this.module = module;
            this.action = action;
            this.evolution = evolution;
            this.name = name;
            this.loading = false;
            this.limit = false;

            this.result = [];
        },
        $http = null,
        $routeParams = null,
        moment = null;

    Report.prototype.fetch = function ()
    {
        var that = this,
            parameters = {
                apiModule: this.module,
                apiAction: this.action,
                idSite: $routeParams.idSite,
                period: this.getPeriod(),
                date: this.getDate()
            },
            request;

        if (this.limit !== false) {
            parameters.filter_limit = this.limit;
        }

        request = $http.post(
            '/api/API/getProcessedReport',
            parameters
        );

        this.loading = true;

        request.then(function (response) {
            that.loading = false;
            that.result = response.data;

            return response;
        });

        return request;
    };

    Report.prototype.getDate = function ()
    {
        var date = ng.isDefined($routeParams.date) ? $routeParams.date : moment().format('YYYY-MM-DD');

        if (this.evolution) {
            if (date.indexOf(',') === -1) {
                date = moment(date).subtract('days', this.getNumberOfDaysForEvolution() - 1).format('YYYY-MM-DD') + ','+ moment(date).format('YYYY-MM-DD');
            }
        }

        return date;
    };

    Report.prototype.getPeriod = function ()
    {
        if (!ng.isDefined($routeParams.date) || this.evolution) {
            return 'day';
        }

        return $routeParams.date.indexOf(',') === -1 ? 'day' : 'range';
    };

    Report.prototype.getNumberOfDaysForEvolution = function ()
    {
        return 10;
    };

    Report.prototype.getNumberOfColumnsForBar = function ()
    {
        return 5;
    };

    Report.prototype.getNumberOfColumnsForPie = function ()
    {
        return 5;
    };

    Report.createFromMetaData = function (metaData)
    {
        return new Report(metaData.module, metaData.action, null, metaData.name);
    };

    Report.fetchMetaData = function ()
    {
        return $http.post(
            '/api/API/getReportMetadata',
            {
                idSite: $routeParams.idSite
            }
        );
    };

    Report.groupMetaDataByColumn = function (metaData, column)
    {
        var result = {};

        ng.forEach(metaData, function (value) {

            if (!result[value[column]]) {
                result[value[column]] = [];
            }

            result[value[column]].push(value);
        });

        return result;
    };

    Report.serialize = function (reports)
    {
        var result = [];

        ng.forEach(
            reports,
            function (report)
            {
                result.push(
                    {
                        report: {
                            module: report.report.module,
                            action: report.report.action,
                            name: report.report.name
                        },
                        visualization: report.visualization,
                        size: report.size
                    }
                );
            }
        );

        return ng.toJson(result);
    };

    Report.unserialize = function (reports)
    {
        var result = ng.fromJson(reports);

        ng.forEach(
            result,
            function (row)
            {
                row.report = new Report(
                    row.report.module,
                    row.report.action,
                    row.visualization === 'evolution',
                    row.report.name
                );
            }
        );

        return result;
    };

    ng.module('piwikExtDash.reports').factory(
        "Report",
        [
            "$http", "$routeParams", "moment",
            function (_$http, _$routeParams, _moment)
            {
                $http = _$http;
                $routeParams = _$routeParams;
                moment = _moment;

                return Report;
            }
        ]
    );
})(window.angular);
