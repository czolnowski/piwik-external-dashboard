(function (ng) {
    'use strict';

    ng.module('piwik-external-dashboard.widget').directive(
        'singleWidgetHeader',
        [
            function ()
            {
                return {
                    restrict: 'AC',
                    scope: {
                        report: '=',
                        dashboard: '='
                    },
                    replace: true,
                    templateUrl: 'views/widget/single/header.html',
                    controller: [
                        '$scope', '$timeout',
                        function ($scope, $timeout)
                        {
                            var that = this,
                                sizeQ = null,
                                visualizationQ = null;

                            this.report = $scope.report;
                            this.dashboard = $scope.dashboard;
                            $scope.size = null;

                            $scope.$watch('size', function (after, before) {
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
                        }
                    ],
                    controllerAs: 'config'
                };
            }
        ]
    );
})(window.angular);
