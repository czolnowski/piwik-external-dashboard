(function (ng) {
    'use strict';

    var app = ng.module('piwikExtDash', [
        'ngCookies',
        'ngSanitize',
        'ngRoute',
        'ui.bootstrap',
        'angularMoment',
        'ui.select2',
        'firebase',
        'LocalStorageModule',
        'ngBootstrap',
        'angular-morrisjs',
        'ui.sortable',
        'ui.gravatar',
        'md5',

        'piwikExtDash.application',
        'piwikExtDash.auth',
        'piwikExtDash.dashboard',
        'piwikExtDash.users',
        'piwikExtDash.widget',
        'piwikExtDash.reports',
        'piwikExtDash.sites',
        'piwikExtDash.morris',
        'piwikExtDash.tables',
        'piwikExtDash.whiteLabel'
    ]);

    app.config(function ($locationProvider) {
        $locationProvider.html5Mode(true);
    });
})(window.angular);
