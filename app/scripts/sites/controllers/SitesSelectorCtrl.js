(function (ng) {
    'use strict';

    var SiteSelectorCtrl = function ($scope, Site, $routeParams)
    {
        $scope.sites = [];
        $scope.site = {};

        this.initialize($scope, Site, $routeParams);

        $scope.$watch('site',function (site) {
            $scope.$emit('sites.selectedSite', site);
        });
    };

    SiteSelectorCtrl.prototype.initialize = function ($scope, Site, $routeParams)
    {
        Site.fetchAllWithAtLeastViewAccess().then(function (response) {
            $scope.sites = response.data;

            if (ng.isDefined($routeParams.idSite)) {
                ng.forEach(
                    $scope.sites,
                    function (site)
                    {
                        if (site.idsite == $routeParams.idSite) {
                            $scope.site = site  ;
                        }
                    }
                );
            } else {
                $scope.site = response.data[0];
            }
        });
    };

    ng.module('piwikExtDash.sites').controller('SitesSelectorCtrl', [
        "$scope", "Site", "$routeParams",
        SiteSelectorCtrl
    ]);
})(window.angular);
