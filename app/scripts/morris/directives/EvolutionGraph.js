(function (ng) {
    'use strict';

    ng.module('piwikExtDash.morris').directive(
        'morrisEvolutionGraph',
        [
            "moment", "metricsColors",
            function (moment, metricsColors)
            {
                return {
                    require: '^singleWidget',
                    restrict: 'AE',
                    templateUrl: 'views/morris/evolution/graph.html',
                    controller: [
                        "$scope",
                        function ($scope)
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

                            $scope.toggleMetric = function (index)
                            {
                                var metric;

                                if (!ng.isDefined(that.graph) || !ng.isDefined($scope.metrics[index])) {
                                    return;
                                }

                                metric = $scope.metrics[index];

                                if (metric.enabled) {
                                    var numberOfEnabled = $scope.metrics.filter(
                                        function (el) {
                                            return el.enabled;
                                        }
                                    );

                                    if (numberOfEnabled.length < 2) {
                                        return;
                                    }
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

                                $scope.rebuildMetricsColors();
                                that.graph.setData($scope.data, true);
                            };

                            $scope.setGraphInstance = function (graph)
                            {
                                that.graph = graph;
                            };
                        }
                    ],
                    link: function($scope, elem, attrs, ctrl) {
                        ctrl.report.report.evolution = true;

                        ctrl.report.report.fetch().then(function (response) {
                            if (ng.isDefined(response.data.metadata)) {
                                if (ng.isDefined(response.data.metadata.metrics)) {
                                    ng.forEach(
                                        response.data.metadata.metrics,
                                        function (name, key)
                                        {
                                            $scope.ykeys.push(key);
                                            $scope.labels.push(name);
                                            $scope.metrics.push(
                                                {
                                                    enabled: true,
                                                    description: response.data.metadata.metricsDocumentation[key],
                                                    name: name,
                                                    key: key
                                                }
                                            );
                                        }
                                    );
                                }
                            }

                            if (ng.isDefined(response.data.reportData)) {
                                var confirmedNumericValues = false;

                                ng.forEach(
                                    response.data.reportData,
                                    function (values, key)
                                    {
                                        if (!confirmedNumericValues) {
                                            ng.forEach(
                                                values,
                                                function (value, metricKey)
                                                {
                                                    if (!ng.isNumber(value)) {
                                                        var index = $scope.ykeys.indexOf(metricKey);

                                                        $scope.ykeys.splice(index, 1);
                                                        $scope.labels.splice(index, 1);
                                                        $scope.metrics.splice(index, 1);
                                                    }
                                                }
                                            );

                                            confirmedNumericValues = true;
                                        }

                                        ng.forEach(
                                            values,
                                            function (value, key)
                                            {
                                                if (!ng.isNumber(value)) {
                                                    delete values[key];
                                                }

                                                confirmedNumericValues = true;
                                            }
                                        );

                                        values[$scope.xkey] = new Date(key).getTime();
                                        $scope.data.push(values);
                                    }
                                );
                            }

                            $scope.rebuildMetricsColors();
                        });

                        $scope.rebuildMetricsColors = function ()
                        {
                            var enabledMetrics = $scope.metrics.filter(
                                    function (metric)
                                    {
                                        return metric.enabled;
                                    }
                                );

                            ng.forEach(
                                enabledMetrics,
                                function (metric, index)
                                {
                                    metric.color = ng.copy(
                                        $scope.metricsColors[index % $scope.metricsColors.length]
                                    );
                                }
                            );
                        };
                    }
                };
            }
        ]
    );
})(window.angular);
