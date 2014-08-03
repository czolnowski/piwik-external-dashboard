(function (ng) {
    var SiteSelectorCtrl = function ($scope, $http, $routeParams, $timeout, $location)
    {
        $http.post(
            '/api/SitesManager/getSitesWithAtLeastViewAccess',
            {}
        ).then(function (response) {
                $scope.sites = response.data;

                if (ng.isDefined($routeParams.idSite)) {
                    for (var index in $scope.sites) {
                        if ($scope.sites.hasOwnProperty(index)) {
                            if ($scope.sites[index].idsite == $routeParams.idSite) {
                                $scope.site = $scope.sites[index];
                            }
                        }
                    }
                } else {
                    $scope.site = response.data[0];
                }
            });

        $scope.sites = [];
        $scope.site = {};

        $scope.$watch('site',function (newSite, oldSite) {
            $timeout(function () {
                if (newSite != oldSite) {
                    $location.path('/' + newSite.idsite);
                }
            },1);
        });
    };

    ng.module('piwikExtDash.dashboard').controller('SiteSelectorCtrl', [
        "$scope", "$http", "$routeParams", "$timeout", "$location",
        SiteSelectorCtrl
    ]);
})(window.angular);
