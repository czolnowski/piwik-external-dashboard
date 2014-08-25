(function (ng) {
    'use strict';

    var PieVisualizationCtrl = function ($scope, moment, metricsColors, MetricsService)
    {
        var that = this;

        $scope.data = [];
        $scope.pieData = [];

        $scope.colors = metricsColors;
        $scope.metrics = [];

        $scope.toggleMetric = function (metric)
        {
            if (!ng.isDefined(that.graph)) {
                return;
            }

            if (metric.enabled) {
                return;
            }

            ng.forEach(
                $scope.metrics,
                function (_metric) {
                    _metric.enabled = false;
                }
            );

            metric.enabled = true;

            $scope.buildDataForKey(metric.key);
            MetricsService.rebuild($scope.metrics);
            that.graph.setData($scope.pieData, true);
        };

        $scope.setGraphInstance = function (graph)
        {
            that.graph = graph;
        };

        $scope.buildDataForKey = function (key)
        {
            $scope.pieData = [];

            ng.forEach(
                $scope.data,
                function (values)
                {
                    if (ng.isDefined(values[key])) {
                        $scope.pieData.push(
                            {
                                label: values.label,
                                value: values[key]
                            }
                        );
                    }
                }
            );
        };
    };

    ng.module('piwik-external-dashboard.morris').controller(
        'MorrisPieVisualizationCtrl',
        [
            '$scope', 'moment', 'metricsColors', 'MetricsService',
            PieVisualizationCtrl
        ]
    );
})(window.angular);
