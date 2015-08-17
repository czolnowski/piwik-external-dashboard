(function () {
    'use strict';

    var Site = function (SitesFetchers) {
        this.fetchAllWithAtLeastViewAccess = function () {
            return SitesFetchers.get().getSitesWithViewAccess();
        };
    };

    angular.module('piwik-external-dashboard.sites').service('Site', Site);
})();
