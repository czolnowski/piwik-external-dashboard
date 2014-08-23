(function (ng) {
    'use strict';

    var $http,
        Site = function ()
        {};

    Site.fetchAllWithAtLeastViewAccess = function ()
    {
        return $http.post(
            '/api/SitesManager/getSitesWithAtLeastViewAccess',
            {}
        );
    };

    ng.module('piwik-external-dashboard.sites').factory(
        'Site',
        [
            '$http',
            function (_$http)
            {
                $http = _$http;

                return Site;
            }
        ]
    );
})(angular);
