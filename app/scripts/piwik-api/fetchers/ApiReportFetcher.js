(function () {
    'use strict';

    angular.module('piwik-external-dashboard.piwik-api').service('PiwikApiReportFetcher', function ($http) {
        var makeRequest = function (parameters) {
                var parametersAsArray = [];

                if (!angular.isDefined(parameters.module)) {
                    parameters.module = 'API';
                }

                if (!angular.isDefined(parameters.format)) {
                    parameters.format = 'json';
                }

                for (var i in parameters) {
                    parametersAsArray.push(i + '=' + parameters[i]);
                }

                return $http.get('/index.php?' + parametersAsArray.join('&'));
            };


        this.fetch = function (parameters) {
            parameters.method = 'API.getProcessedReport';

            return makeRequest(parameters);
        };

        this.fetchMetaData = function (parameters) {
            parameters.method = 'API.getReportMetadata';
            parameters.date = 'today';
            parameters.period = 'day';

            return makeRequest(parameters);
        };

        this.getVersion = function () {

            return makeRequest({method: 'API.getPiwikVersion'});
        };

        this.getLogo = function () {
            return makeRequest({method: 'API.getLogoUrl'});
        };

        this.getSitesWithViewAccess = function () {
            return makeRequest({method: 'SitesManager.getSitesWithAtLeastViewAccess'});
        };

        this.getTokenAuth = function (parameters) {
            parameters.method = 'UsersManager.getTokenAuth';

            return makeRequest(parameters);
        };

        this.getUser = function (login) {
            return makeRequest(
                {
                    method: 'UsersManager.getUser',
                    userLogin: login
                }
            );
        };
    });
})();
