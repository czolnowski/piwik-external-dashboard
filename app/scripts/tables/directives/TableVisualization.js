(function (ng) {
    'use strict';

    ng.module('piwikExtDash.tables').directive(
        'tableVisualization',
        [
            function ()
            {
                return {
                    require: '^singleWidget',
                    restrict: 'AE',
                    templateUrl: 'views/tables/visualization.html',
                    controller: "TableVisualizationCtrl",
                    controllerAs: "visualization",
                    replace: true,
                    link: function($scope, elem, attrs, ctrl) {
                        ctrl.report.limit = -1;

                        ctrl.report.fetch().then(
                            function (response)
                            {
                                var columns = ng.extend(
                                    response.data.metadata.metrics,
                                    response.data.metadata.processedMetrics
                                );

                                $scope.data = response.data;
                                $scope.columns = [];

                                ng.forEach(
                                    columns,
                                    function (label, key)
                                    {
                                        $scope.columns.push(
                                            {
                                                key: key,
                                                label: label
                                            }
                                        );
                                    }
                                );

                                $scope.dimensions = {
                                    page: 1,
                                    perPage: 10,
                                    total: 100,
                                    sortBy: $scope.columns[0].key,
                                    sortOrder: 'desc'
                                };
                            }
                        );
                    }
                };
            }
        ]
    );
})(window.angular);
