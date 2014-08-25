(function (ng) {
    'use strict';

    ng.module('piwik-external-dashboard.morris').directive(
        'morrisPieVisualization',
        [
            'MetricsService',
            function (MetricsService)
            {
                return {
                    require: '^singleWidget',
                    restrict: 'AE',
                    templateUrl: 'views/morris/pie/index.html',
                    controller: 'MorrisPieVisualizationCtrl',
                    link: function($scope, elem, attrs, ctrl) {
                        ctrl.report.evolution = false;
                        ctrl.report.limit = 20;

                        ctrl.report.fetch().then(function (response) {
                            if (ng.isDefined(response.data.metadata) && ng.isDefined(response.data.metadata.metrics)) {
                                MetricsService.parseMetadata(
                                    response.data.metadata,
                                    [],
                                    [],
                                    $scope.metrics
                                );

                                ng.forEach(
                                    $scope.metrics,
                                    function (metric)
                                    {
                                        metric.enabled = false;
                                    }
                                );
                                $scope.metrics[0].enabled = true;

                                if (ng.isDefined(response.data.reportData)) {
                                    $scope.data = MetricsService.parseValues(
                                        response.data.reportData,
                                        [],
                                        [],
                                        $scope.metrics,
                                        'label'
                                    );

                                    $scope.buildDataForKey($scope.metrics[0].key);
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
