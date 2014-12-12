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
            'md5',
            'angular-growl',

            'piwik-external-dashboard.application',
            'piwik-external-dashboard.auth',
            'piwik-external-dashboard.dashboard',
            'piwik-external-dashboard.users',
            'piwik-external-dashboard.widget',
            'piwik-external-dashboard.reports',
            'piwik-external-dashboard.sites',
            'piwik-external-dashboard.morris',
            'piwik-external-dashboard.tables',
            'piwik-external-dashboard.whiteLabel',
            'piwik-external-dashboard.firebase'
        ]
    )
    .config(
        [
            '$locationProvider',
            '$routeProvider',
            function ($locationProvider, $routeProvider)
            {
                $locationProvider.html5Mode(true);
                $routeProvider.otherwise('/');
            }
        ]
    );
})(window.angular);
