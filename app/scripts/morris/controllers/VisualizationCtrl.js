(function (ng) {
    var VisualizationCtrl = function ($scope, moment, metricsColors, MetricsService)
    {
        var that = this;

        $scope.data = [];
        $scope.xkey = 'label';
        $scope.ykeys = [];
        $scope.labels = [];

        $scope.metricsColors = metricsColors;
        $scope.metrics = [];

        $scope.dateFormat = function (date)
        {
            return moment(date).format("YYYY-MM-DD");
        };

        $scope.toggleMetric = function (metric, index)
        {
            if (!ng.isDefined(that.graph)) {
                return;
            }

            if (metric.enabled && MetricsService.getEnabled($scope.metrics).length < 2) {
                return;
            }

            metric.enabled = !metric.enabled;
            if (metric.enabled) {
                $scope.labels.splice(index, 0, metric.name);
                $scope.ykeys.splice(index, 0, metric.key);
            } else {
                var localIndex = $scope.ykeys.indexOf(metric.key);

                $scope.labels.splice(localIndex, 1);
                $scope.ykeys.splice(localIndex, 1);
            }

            MetricsService.rebuild($scope.metrics);
            that.graph.setData($scope.data, true);
        };

        $scope.setGraphInstance = function (graph)
        {
            that.graph = graph;
        };
    };

    ng.module('piwikExtDash.morris').controller(
        'MorrisVisualizationCtrl',
        [
            "$scope", "moment", "metricsColors", "MetricsService",
            VisualizationCtrl
        ]
    );
})(window.angular);
