(function () {
    'use strict';

    var Report = function (module, action, evolution, name) {
        this.module = module;
        this.action = action;
        this.evolution = evolution;
        this.name = name;
        this.loading = false;
        this.limit = false;
        this.metadata = {};
        this.data = false;
    };

    Report.prototype.fetch = function () {
        var that = this,
            request = Report.fetcher.fetch(this.getParameters());

        this.loading = true;

        request.then(function (response) {
            that.loading = false;
            that.metadata = response.data.metadata;
            that.data = response.data.reportData;

            return response;
        });

        return request;
    };

    Report.prototype.getParameters = function () {
        var parameters = {
            apiModule: this.module,
            apiAction: this.action,
            idSite: Report.$routeParams.idSite,
            period: this.getPeriod(),
            date: this.getDate()
        };

        if (this.limit !== false) {
            /*jshint camelcase: false */
            parameters.filter_limit = this.limit;
            /*jshint camelcase: true */
        }

        return parameters;
    };

    Report.prototype.getDate = function ()
    {
        var date = Report.moment().format('YYYY-MM-DD');
        if (angular.isDefined(Report.$routeParams.date)) {
            date = Report.$routeParams.date;
        }

        if (this.evolution) {
            if (date.indexOf(',') === -1) {
                date = [
                    Report.moment(date)
                        .subtract('days', this.getNumberOfDaysForEvolution() - 1)
                        .format('YYYY-MM-DD'),
                    Report.moment(date).format('YYYY-MM-DD')
                ].join(',');
            }
        }

        return date;
    };

    Report.prototype.getPeriod = function ()
    {
        if (!angular.isDefined(Report.$routeParams.date) || this.evolution) {
            return 'day';
        }

        return Report.$routeParams.date.indexOf(',') === -1 ? 'day' : 'range';
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
        return Report.fetcher.fetchMetaData({
            idSite: Report.$routeParams.idSite
        });
    };

    Report.groupMetaDataByColumn = function (metaData, column)
    {
        var result = {};

        angular.forEach(metaData, function (value) {

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

        angular.forEach(
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

        return angular.toJson(result);
    };

    Report.unserialize = function (reports)
    {
        angular.forEach(
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

    angular.module('piwik-external-dashboard.reports').factory('Report', function ($routeParams, moment,
                                                                                   $q, ReportFetchers) {
        Report.$routeParams = $routeParams;
        Report.moment = moment;
        Report.$q = $q;
        Report.fetcher = ReportFetchers.get();

        return Report;
    });
})();
