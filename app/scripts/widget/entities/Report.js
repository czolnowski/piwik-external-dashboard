(function (ng) {
    var Report = function (module, action, evolution)
    {
        this.module = module;
        this.action = action;
        this.evolution = evolution;
    },

    _$http = null,
    _$routeParams = null,
    _moment = null;

    Report.prototype.fetch = function ()
    {
        return _$http.post(
            '/api/API/getProcessedReport',
            {
                apiModule: this.module,
                apiAction: this.action,
                idSite: ng.isDefined(_$routeParams.idSite) ? _$routeParams.idSite : '7',
                period: ng.isDefined(_$routeParams.period) ? _$routeParams.period : 'day',
                date: this.getDate()
            }
        );
    };

    Report.prototype.getDate = function ()
    {
        var date = ng.isDefined(_$routeParams.date) ? _$routeParams.date : 'today';
        if (this.evolution) {
            date = moment(date).subtract('days', 2).format('YYYY-MM-DD') + ','+ moment(date).format('YYYY-MM-DD');
        }

        return date;
    };

    ng.module('piwikExtDash.widget').factory('Report', [
        "$http", "$routeParams", "moment",
        function ($http, $routeParams, moment)
        {
            _$http = $http;
            _$routeParams = $routeParams;
            _moment = moment;

            return Report;
        }
    ]);
})(angular);
