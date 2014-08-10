(function (ng) {
    var AddReportModalCtrl = function (_$scope, $modalInstance, reports, Report)
    {
        $scope = _$scope;

        this.initializeSizes();
        this.initializeVisualizations();
        this.initializeReports(reports, Report);

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
    },
        $scope;

    AddReportModalCtrl.prototype.initializeSizes = function ()
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

    AddReportModalCtrl.prototype.initializeVisualizations = function ()
    {
        $scope.visualization = null;
        $scope.visualizationTypes = ['table', 'evolution', 'bar', 'pie'];

        $scope.changeVisualization = function (visualization) {
            if ($scope.visualizationTypes.indexOf(visualization) > -1) {
                $scope.visualization = visualization;
            }
        }
    };

    AddReportModalCtrl.prototype.initializeReports = function (reports, Report)
    {
        $scope.report = null;
        $scope.reports = Report.groupMetaDataByColumn(
            reports.data,
            "category"
        );
        $scope.changeReport = function (report)
        {
            if (ng.isDefined($scope.reports[report.category])) {
                ng.forEach(
                    $scope.reports[report.category],
                    function (current) {
                        if (report === current) {
                            $scope.report = Report.createFromMetaData(current);
                        }
                    }
                );
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
