(function (ng) {
    'use strict';

    var Report = function (module, action, evolution)
        {
            this.module = module;
            this.action = action;
            this.evolution = evolution;
            this.loading = false;

            this.result = [];
        },
        $http = null,
        $routeParams = null,
        moment = null;

    Report.prototype.fetch = function ()
    {
        var that = this,
            request = $http.post(
                '/api/API/getProcessedReport',
                {
                    apiModule: this.module,
                    apiAction: this.action,
                    idSite: $routeParams.idSite,
                    period: this.getPeriod(),
                    date: this.getDate()
                }
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
