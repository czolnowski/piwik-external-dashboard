(function (ng) {
    'use strict';

    ng.module('piwikExtDash.morris').directive(
        'morrisEvolutionVisualization',
        [
            "MetricsService",
            function (MetricsService)
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
