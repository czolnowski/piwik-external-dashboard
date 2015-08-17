(function () {
    'use strict';

    var module = angular.module('piwik-external-dashboard.application');

    module.directive('applicationBrandLogo', function (ApplicationFetchers, PIWIK_CHANGELOG_URL, ASSETS_BASE_PATH, LOGO_BACK_URL) {
        return {
            replace: true,
            templateUrl: ASSETS_BASE_PATH + 'views/application/brand-logo.html',
            link: function ($scope) {
                var fetcher = ApplicationFetchers.get(),
                    requests = {
                        version: fetcher.getVersion(),
                        logo: fetcher.getLogo()
                    };

                $scope.backUrl = LOGO_BACK_URL;

                requests.logo.then(
                    function (response) {
                        if (angular.isDefined(response.data) && angular.isDefined(response.data.value)) {
                            $scope.logoUrl = response.data.value;
                        }
                    }
                );

                requests.version.then(
                    function (response) {
                        if (angular.isDefined(response.data) && angular.isDefined(response.data.value)) {
                            $scope.version = 'v' + response.data.value;

                            $scope.changeLogUrl = PIWIK_CHANGELOG_URL + '-';
                            $scope.changeLogUrl += response.data.value.split('.').join('-') + '/';
                        }
                    }
                );
            }
        };
    });
})();
