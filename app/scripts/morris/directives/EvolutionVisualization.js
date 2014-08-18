(function (ng) {
    'use strict';

    ng.module('piwikExtDash.morris').directive(
        'morrisEvolutionVisualization',
        [
            "MetricsService", "Metric",
            function (MetricsService, Metric)
            {
                return {
                    require: '^singleWidget',
                    restrict: 'AE',
                    templateUrl: 'views/morris/evolution/index.html',
                    controller: "MorrisVisualizationCtrl",
                    link: function($scope, elem, attrs, ctrl) {
                        ctrl.report.evolution = true;

                        ctrl.report.fetch().then(function (response) {
                            if (ng.isDefined(response.data.metadata) && ng.isDefined(response.data.metadata.metrics)) {
                                MetricsService.parseMetadata(
                                    response.data.metadata,
                                    $scope.ykeys,
                                    $scope.labels,
                                    $scope.metrics
                                );

                                if (ng.isDefined(response.data.reportData)) {
                                    var firstRow = null;
                                    for (var date in response.data.reportData) {
                                        if (response.data.reportData.hasOwnProperty(date)) {
                                            firstRow = response.data.reportData[date];

                                            break;
                                        }
                                    }

                                    if (firstRow !== null) {
                                        if (ng.isObject(firstRow) && !ng.isArray(firstRow)) {
                                            $scope.data = MetricsService.parseValues(
                                                response.data.reportData,
                                                $scope.ykeys,
                                                $scope.labels,
                                                $scope.metrics,
                                                $scope.xkey,
                                                function (values, key)
                                                {
                                                    values[$scope.xkey] = new Date(key).getTime();
                                                }
                                            );
                                        } else {
                                            console.log('multiple')
                                            var firstLoop = true,
                                                keyForValues = $scope.metrics[0].key,
                                                numberOfMetrics = 0,
                                                i;
                                            for (var key in response.data.reportData) {
                                                if (response.data.reportData.hasOwnProperty(key)) {
                                                    var values = response.data.reportData[key],
                                                        valuesForData = {};

                                                    if (firstLoop) {
                                                        numberOfMetrics = Math.min(10, values.length);
                                                        firstLoop = false;

                                                        $scope.ykeys = [];
                                                        $scope.metrics = [];
                                                        $scope.labels = [];

                                                        for (i = 0; i < numberOfMetrics; ++i) {
                                                            $scope.ykeys.push('metric' + i);
                                                            $scope.labels.push(values[i].label);
                                                            $scope.metrics.push(
                                                                new Metric(
                                                                    values[i].label,
                                                                    'metric' + i,
                                                                    ""
                                                                )
                                                            );
                                                        }
                                                    }

                                                    for (i = 0; i < numberOfMetrics; ++i) {
                                                        valuesForData['metric' + i] = values[i][keyForValues];
                                                    }

                                                    valuesForData[$scope.xkey] = new Date(key).getTime();
                                                    $scope.data.push(valuesForData);
                                                }
                                            }
                                        }
                                    }
                                }

                                MetricsService.rebuild($scope.metrics);
                            }
                        });
                    }
                };
            }
        ]
    );
})(window.angular);
