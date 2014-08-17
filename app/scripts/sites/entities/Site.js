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

    ng.module('piwikExtDash.sites').factory(
        'Site',
        [
            "$http",
            function (_$http)
            {
                $http = _$http;

                return Site;
            }
        ]
    );
})(angular);
