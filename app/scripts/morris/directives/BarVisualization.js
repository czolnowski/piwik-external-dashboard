(function (ng) {
    'use strict';

    ng.module('piwik-external-dashboard.morris').directive(
        'morrisBarVisualization',
        [
            'MetricsService',
            'ASSETS_BASE_PATH',
            function (MetricsService, ASSETS_BASE_PATH)
            {
                return {
                    require: '^singleWidget',
                    restrict: 'AE',
                    templateUrl: ASSETS_BASE_PATH + 'views/morris/bar/index.html',
                    controller: 'MorrisVisualizationCtrl',
                    link: function($scope, elem, attrs, ctrl) {
                        ctrl.report.evolution = false;
                        ctrl.report.limit = 20;

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
                                        $scope.xkey
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
