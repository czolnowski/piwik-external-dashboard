// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html
'use strict';

module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-cookies/angular-cookies.js',
            'app/bower_components/angular-sanitize/angular-sanitize.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-gravatar/build/md5.js',

            'app/scripts/users/module.js',
            'app/scripts/users/entities/User.js',

            'app/scripts/auth/module.js',
            'app/scripts/auth/services/Authenticate.js',
            'app/scripts/auth/services/Token.js',
            'app/scripts/auth/services/TokenInterceptor.js',
            'app/scripts/auth/controllers/LoginCtrl.js',

            //'app/scripts/api/module.js',
            //'app/scripts/api/fetchers/ApiReportFetcher.js',
            //
            //'app/scripts/application/module.js',
            //'app/scripts/application/directives/Sidebar.js',
            //'app/scripts/application/directives/BrandLogo.js',
            //'app/scripts/application/directives/Backdrop.js',
            //'app/scripts/application/directives/UserBar.js',
            //'app/scripts/application/directives/Container.js',
            //
            //'app/scripts/dashboard/module.js',
            //'app/scripts/dashboard/controllers/DashboardCtrl.js',
            //'app/scripts/dashboard/controllers/nav/DateSelectorCtrl.js',
            //'app/scripts/dashboard/controllers/nav/ExportReportsCtrl.js',
            //'app/scripts/dashboard/controllers/nav/AddReportCtrl.js',
            //'app/scripts/dashboard/directives/DashboardNavBar.js',
            //'app/scripts/dashboard/directives/DateSelector.js',
            //'app/scripts/dashboard/directives/ExportReports.js',
            //'app/scripts/dashboard/directives/AddReport.js',
            //'app/scripts/dashboard/entities/State.js',
            //'app/scripts/dashboard/entities/States.js',
            //'app/scripts/dashboard/services/ReportsStateFetcher.js',
            //'app/scripts/dashboard/services/LocalState.js',
            //
            //'app/scripts/widget/module.js',
            //'app/scripts/widget/filters/isEmpty.js',
            //'app/scripts/widget/directives/SingleWidget.js',
            //'app/scripts/widget/directives/SingleWidgetHeader.js',
            //'app/scripts/widget/directives/SingleWidgetFooter.js',
            //
            //'app/scripts/reports/module.js',
            //'app/scripts/reports/controllers/AddReportModalCtrl.js',
            //'app/scripts/reports/entities/Report.js',
            //'app/scripts/reports/collections/ReportFetchers.js',
            //
            //'app/scripts/sites/module.js',
            //'app/scripts/sites/entities/Site.js',
            //'app/scripts/sites/controllers/SitesSelectorCtrl.js',
            //'app/scripts/sites/directives/SitesSelector.js',
            //
            //'app/scripts/morris/module.js',
            //'app/scripts/morris/controllers/VisualizationCtrl.js',
            //'app/scripts/morris/controllers/PieVisualizationCtrl.js',
            //'app/scripts/morris/services/MetricsService.js',
            //'app/scripts/morris/services/Metric.js',
            //'app/scripts/morris/directives/MetricsSelector.js',
            //'app/scripts/morris/directives/EvolutionVisualization.js',
            //'app/scripts/morris/directives/BarVisualization.js',
            //'app/scripts/morris/directives/PieVisualization.js',
            //
            //'app/scripts/tables/module.js',
            //'app/scripts/tables/controllers/TableVisualizationCtrl.js',
            //'app/scripts/tables/directives/TableVisualization.js',
            //'app/scripts/tables/directives/TablePagination.js',
            //'app/scripts/tables/filters/LimitFromTo.js',
            //'app/scripts/tables/filters/Min.js',
            //'app/scripts/tables/services/TablePaginationService.js',
            //
            //'app/scripts/white-label/module.js',
            //
            //'app/scripts/firebase/module.js',
            //
            //'app/scripts/app.js',

            //'test/mock/**/*.js',
            'test/spec/**/*.js'
        ],

        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 8080,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
