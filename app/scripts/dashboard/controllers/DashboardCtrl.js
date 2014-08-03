(function (ng, Firebase) {
    'use strict';

    var DashboardCtrl = function ($scope, _$routeParams, _$location, _$firebase, _md5, _$modal, _localStorageService)
    {
        $firebase = _$firebase;
        localStorageService = _localStorageService;
        $location = _$location;
        md5 = _md5;
        $modal = _$modal;
        $routeParams = _$routeParams;

        this.sync = $firebase(
            new Firebase('https://piwik-ext-dashboard.firebaseio.com/dashboards')
        );
        this.reports = [];
        this.isLoading = false;
        this.reportsModalIsLoading = false;
        this.exportIsLoading = false;

        this.initialize();
    },
        localStorageService,
        $location,
        $firebase,
        $modal,
        md5,
        $routeParams;

    DashboardCtrl.prototype.initialize = function ()
    {
        var that = this;

        if (ng.isDefined($routeParams.dashboard)) {
            this.isLoading = true;

            this.sync.$asObject().$loaded().then(function (response) {
                that.reports = ng.fromJson(
                    response[$routeParams.dashboard]
                );

                that.isLoading = false;
            });
        } else {
            var reports = ng.fromJson(
                localStorageService.get('reports')
            );

            if (ng.isArray(reports)) {
                this.reports = reports;
            }
        }
    };

    DashboardCtrl.prototype.openReportsModal = function ()
    {
        var modalInstance = $modal.open({
                templateUrl: 'views/reports/add-modal.html',
                controller: 'AddReportModalCtrl',
                resolve: {
                    reports: [
                        "Report",
                        function (Report)
                        {
                            return Report.fetchMetaData();
                        }
                    ]
                }
            }),
            that = this;

        this.reportsModalIsLoading = true;

        modalInstance.result.then(
            function (result) {
                that.reports.push(ng.copy(result));

                that.persist();
                that.reportsModalIsLoading = false;
            },
            function ()
            {
                that.reportsModalIsLoading = false;
            }
        );
    };

    DashboardCtrl.prototype.remove = function (report)
    {
        var index = this.reports.indexOf(report);

        if (index > -1) {
            this.reports.splice(index, 1);
            this.persist();
        }
    };

    DashboardCtrl.prototype.exportDashboard = function () {
        var reportsAsString = ng.toJson(this.serializeReports()),
            reportsName = md5.createHash(reportsAsString),
            that = this;

        this.exportIsLoading = true;

        if (reportsName in this.sync.$asObject()) {
            $location.search('dashboard', reportsName);
            this.exportIsLoading = false;
        } else {
            this.sync.$set(reportsName, reportsAsString).then(function () {
                $location.search('dashboard', reportsName);
                that.exportIsLoading = false;
            });
        }
    };

    DashboardCtrl.prototype.persist = function ()
    {
        var reportsAsString = ng.toJson(this.reports);

        if (localStorageService.isSupported) {
            localStorageService.add("reports", reportsAsString);
        } else {
            localStorageService.cookie.add("reports", reportsAsString);
        }

        $location.search('dashboard', null);
    };

    DashboardCtrl.prototype.serializeReports = function ()
    {
        var serialized = [];

        ng.forEach(
            this.reports,
            function (report) {
                serialized.push(
                    {
                        report: {
                            action: report.report.action,
                            module: report.report.module,
                            category: report.report.category,
                            name: report.report.name
                        },
                        visualization: report.visualization,
                        size: report.size
                    }
                );
            }
        );

        return serialized;
    };

    ng.module('piwikExtDash.dashboard').controller("DashboardCtrl", [
        "$scope",
        "$routeParams",
        "$location",
        "$firebase",
        "md5",
        "$modal",
        "localStorageService",
        DashboardCtrl
    ]);
})(angular, window.Firebase);
