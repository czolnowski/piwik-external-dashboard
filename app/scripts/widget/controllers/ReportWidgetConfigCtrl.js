(function (ng) {
    'use strict';

    var ReportWidgetConfigCtrl = function ($scope, $timeout)
    {
        var that = this,
            sizeQ = null,
            visualizationQ = null;

        this.report = null;
        this.dashboard = null;
        $scope.size = null;

        $scope.$watch("size", function (after, before) {
            if (after !== before) {
                if (sizeQ !== null) {
                    $timeout.cancel(sizeQ);
                }

                sizeQ = $timeout(function () {
                    var visualization = that.report.visualization;

                    if (visualizationQ !== null) {
                        $timeout.cancel(visualizationQ);

                        if (ng.isDefined(that.report._visualization)) {
                            that.report.visualization = that.report._visualization;
                        }
                    }

                    that.report._visualization = visualization;
                    that.report.size = after;
                    that.report.visualization = null;

                    visualizationQ = $timeout(function () {
                        that.report.visualization = visualization;

                        that.dashboard.persist();
                    }, 200);
                }, 200);
            }
        });
    };

    ng.module('piwikExtDash.widget').controller(
        'ReportWidgetConfigCtrl',
        [
            "$scope", "$timeout",
            ReportWidgetConfigCtrl
        ]
    );
})(window.angular);
