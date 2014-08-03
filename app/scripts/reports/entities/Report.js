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
        _$http = null,
        _$routeParams = null,
        _moment = null;

    Report.prototype.fetch = function ()
    {
        var that = this,
            request = _$http.post(
                '/api/API/getProcessedReport',
                {
                    apiModule: this.module,
                    apiAction: this.action,
                    idSite: _$routeParams.idSite,
                    period: ng.isDefined(_$routeParams.period) ? _$routeParams.period : 'day',
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
        var date = ng.isDefined(_$routeParams.date) ? _$routeParams.date : moment(new Date()).format('YYYY-MM-DD');

        if (this.evolution) {
            date = moment(date).subtract('days', this.getNumberOfDaysForEvolution() - 1).format('YYYY-MM-DD') + ','+ moment(date).format('YYYY-MM-DD');
        }

        return date;
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
        return _$http.post(
            '/api/API/getReportMetadata',
            {
                idSite: _$routeParams.idSite
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
            function ($http, $routeParams, moment)
            {
                _$http = $http;
                _$routeParams = $routeParams;
                _moment = moment;

                return Report;
            }
        ]
    );
})(window.angular);
