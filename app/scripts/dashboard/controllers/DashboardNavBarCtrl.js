(function (ng) {
    'use strict';

    var DashboardNavBarCtrl = function (_Authenticate, _$cookieStore, _$location)
        {
            Authenticate = _Authenticate;
            $cookieStore = _$cookieStore;
            $location = _$location;
        },
        Authenticate,
        $cookieStore,
        $location;

    DashboardNavBarCtrl.prototype.getUser = function ()
    {
        return Authenticate.me;
    };

    DashboardNavBarCtrl.prototype.logout = function ()
    {
        $cookieStore.remove('token');
    };

    ng.module('piwikExtDash.dashboard').controller("DashboardNavBarCtrl", [
        "Authenticate", "$cookieStore", "$location",
        DashboardNavBarCtrl
    ]);
})(window.angular);
