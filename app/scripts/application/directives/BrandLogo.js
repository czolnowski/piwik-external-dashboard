(function (ng) {
    'use strict';

    ng.module('piwik-external-dashboard.application').directive(
        'applicationBrandLogo',
        [
            '$http',
            function ($http)
            {
                return {
                    replace: true,
                    templateUrl: 'views/application/brand-logo.html',
                    link: function ($scope)
                    {
                        var requests = {
                            version: $http.post('/api/API/getPiwikVersion', {}),
                            logo: $http.post('/api/API/getLogoUrl', {})
                        };

                        requests.logo.then(
                            function (response) {
                                if (ng.isDefined(response.data.value)) {
                                    $scope.logoUrl = response.data.value;
                                }
                            }
                        );

                        requests.version.then(
                            function (response) {
                                if (ng.isDefined(response.data.value)) {
                                    $scope.version = 'v' + response.data.value;

                                    $scope.changeLogUrl = 'http://piwik.org/changelog/piwik-' + response.data.value.split('.').join('-') + '/';
                                }
                            }
                        );
                    }
                };
            }
        ]
    );
})(window.angular);
