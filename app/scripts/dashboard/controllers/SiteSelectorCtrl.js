(function (ng) {
    var SiteSelectorCtrl = function ($scope, $http, $routeParams, $timeout, $location)
    {
        $http.post(
            '/api/SitesManager/getSitesWithAtLeastViewAccess',
            {}
        ).then(function (response) {
                $scope.sites = response.data;

                if (ng.isDefined($routeParams.idSite)) {
                    $scope.ss = $routeParams.idSite;
                } else {
                    $scope.ss = response.data[0].idsite;
                }
            });
        $scope.sites = [];
        $scope.ss = {};

        $scope.$watch('ss',function (newSite, oldSite) {
            $timeout(function () {
                if (newSite != oldSite) {
                    $location.path('/' + newSite);
                }
            },1);
        });
    };

    ng.module('piwikExtDash.dashboard').controller('SiteSelectorCtrl', [
        "$scope", "$http", "$routeParams", "$timeout", "$location",
        SiteSelectorCtrl
    ]);
})(window.angular);
