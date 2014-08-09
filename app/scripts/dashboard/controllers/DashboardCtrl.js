(function (ng, Firebase) {
    'use strict';

    var DashboardCtrl = function ($scope, _$routeParams, _$location,
                                  _$firebase, _md5, _$modal, _localStorageService,
                                  _Report)
    {
        $firebase = _$firebase;
        localStorageService = _localStorageService;
        $location = _$location;
        md5 = _md5;
        $modal = _$modal;
        $routeParams = _$routeParams;
        Report = _Report;

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
        $routeParams,
        Report;

    DashboardCtrl.prototype.initialize = function ()
    {
        var that = this;

        if (ng.isDefined($routeParams.dashboard)) {
            this.isLoading = true;

            this.sync.$asObject().$loaded().then(function (response) {
                that.reports = Report.unserialize(
                    response[$routeParams.dashboard]
                );

                that.isLoading = false;
            });
        } else {
            var reports = Report.unserialize(
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
        var reportsAsString = Report.serialize(this.reports),
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
        var reportsAsString = Report.serialize(this.reports);

        if (localStorageService.isSupported) {
            localStorageService.add("reports", reportsAsString);
        } else {
            localStorageService.cookie.add("reports", reportsAsString);
        }

        $location.search('dashboard', null);
    };

    ng.module('piwikExtDash.dashboard').controller("DashboardCtrl", [
        "$scope",
        "$routeParams",
        "$location",
        "$firebase",
        "md5",
        "$modal",
        "localStorageService",
        "Report",
        DashboardCtrl
    ]);
})(angular, window.Firebase);
