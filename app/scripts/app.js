(function (ng) {
    'use strict';

    ng.module(
        'piwik-external-dashboard',
        [
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
            'angular-md5',
            'angular-growl',

            'piwik-external-dashboard.application',
            'piwik-external-dashboard.users',
            'piwik-external-dashboard.widget',
            'piwik-external-dashboard.reports',
            'piwik-external-dashboard.sites',
            'piwik-external-dashboard.morris',
            'piwik-external-dashboard.tables',
            'piwik-external-dashboard.whiteLabel',
            'piwik-external-dashboard.firebase',
            'piwik-external-dashboard.api',
            'piwik-external-dashboard.piwik-api',
            'piwik-external-dashboard.auth',
            'piwik-external-dashboard.dashboard'
        ]
    )
    .config(
        [
            '$locationProvider',
            '$routeProvider',
            'USE_HTML5_MODE',
            function ($locationProvider, $routeProvider, USE_HTML5_MODE)
            {
                $locationProvider.html5Mode(USE_HTML5_MODE === true);
                $routeProvider.otherwise('/');
            }
        ]
    );
})(window.angular);
