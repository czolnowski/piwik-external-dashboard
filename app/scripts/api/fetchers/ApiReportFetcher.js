(function () {
    'use strict';

    angular.module('piwik-external-dashboard.api').service('ApiReportFetcher', function ($http) {
        this.fetch = function (parameters) {
            parameters.method = 'API.getProcessedReport';

            return $http.post('/api', parameters);
        };

        this.fetchMetaData = function (parameters) {
            parameters.method = 'API.getReportMetadata';
            parameters.date = 'today';
            parameters.period = 'day';

            return $http.post('/api', parameters);
        };

        this.getVersion = function () {
            return $http.post('/api', {method: 'API.getPiwikVersion'});
        };

        this.getLogo = function () {
            return $http.post('/api', {method: 'API.getLogoUrl'});
        };
    });
})();
