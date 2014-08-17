(function (ng) {
    'use strict';

    var app = ng.module('piwikExtDash', [
        'ngCookies',
        'ngSanitize',
        'ngRoute',
        'angular-md5',
        'ui.bootstrap',
        'angularMoment',
        'ui.select2',
        'firebase',
        'LocalStorageModule',
        'ngBootstrap',
        'angular-morrisjs',
        'ui.sortable',

        'piwikExtDash.auth',
        'piwikExtDash.dashboard',
        'piwikExtDash.users',
        'piwikExtDash.widget',
        'piwikExtDash.reports',
        'piwikExtDash.morris',
        'piwikExtDash.tables',
        'piwikExtDash.whiteLabel'
    ]);

    app.config(function ($locationProvider) {
        $locationProvider.html5Mode(true);
    });
})(window.angular);
