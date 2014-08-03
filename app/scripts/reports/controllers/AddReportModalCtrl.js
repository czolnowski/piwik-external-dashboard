(function (ng) {
    var AddReportModalCtrl = function ($scope, $modalInstance, reports, Report)
    {
        this.initializeSizes($scope);
        this.initializeVisualizations($scope);
        this.initializeReports($scope, reports, Report);

        $scope.add = function ()
        {
            $modalInstance.close(
                {
                    size: $scope.size,
                    visualization: $scope.visualization,
                    report: $scope.report
                }
            );
        };

        $scope.cancel = function ()
        {
            $modalInstance.dismiss('cancel');
        };
    };

    AddReportModalCtrl.prototype.initializeSizes = function ($scope)
    {
        $scope.size = null;
        $scope.sizes = [];
        for (var i = 1; i < 13; ++i) {
            $scope.sizes.push(i);
        }

        $scope.changeSize = function (size)
        {
            if ($scope.sizes.indexOf(size) > -1) {
                $scope.size = size;
            }
        };
    };

    AddReportModalCtrl.prototype.initializeVisualizations = function ($scope)
    {
        $scope.visualization = null;
        $scope.visualizationTypes = ['table', 'evolution', 'bar', 'pie'];

        $scope.changeVisualization = function (visualization) {
            if ($scope.visualizationTypes.indexOf(visualization) > -1) {
                $scope.visualization = visualization;
            }
        }
    };

    AddReportModalCtrl.prototype.initializeReports = function ($scope, reports, Report)
    {
        $scope.report = null;
        $scope.reports = Report.groupMetaDataByColumn(
            reports.data,
            "category"
        );
        $scope.changeReport = function (report)
        {
            if (ng.isDefined($scope.reports[report.category])) {
                for (var index in $scope.reports[report.category]) {
                    if ($scope.reports[report.category].hasOwnProperty(index)) {
                        if ($scope.reports[report.category][index] === report) {
                            $scope.report = report;
                        }
                    }
                }
            }
        };
    };

    ng.module('piwikExtDash.reports').controller(
        'AddReportModalCtrl',
        [
            "$scope", "$modalInstance", "reports", "Report",
            AddReportModalCtrl
        ]
    )
})(window.angular);
