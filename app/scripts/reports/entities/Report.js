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
            this.metadata = {};
            this.data = false;
        },
        $http = null,
        $routeParams = null,
        moment = null,
        $q = null;

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

        if (!ng.isDefined($routeParams.idSite)) {
            var deferred = $q.defer();

            deferred.resolve(
                {
                    data: {}
                }
            );

            that.loading = false;
            that.data = {};

            return deferred.promise;
        }

        if (this.limit !== false) {
            /*jshint camelcase: false */
            parameters.filter_limit = this.limit;
            /*jshint camelcase: true */
        }

        request = $http.post(
            '/api/API/getProcessedReport',
            parameters
        );

        this.loading = true;

        request.then(function (response) {
            that.loading = false;
            that.metadata = response.data.metadata;
            that.data = response.data.reportData;

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
        ng.forEach(
            reports,
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

        return reports;
    };

    ng.module('piwik-external-dashboard.reports').factory(
        'Report',
        [
            '$http', '$routeParams', 'moment', '$q',
            function (_$http, _$routeParams, _moment, _$q)
            {
                $http = _$http;
                $routeParams = _$routeParams;
                moment = _moment;
                $q = _$q;

                return Report;
            }
        ]
    );
})(window.angular);
