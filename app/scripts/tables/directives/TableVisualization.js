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
                        ctrl.report.evolution = false;

                        ctrl.report.fetch().then(
                            function (response)
                            {
                                if (!ng.isDefined(response.data.metadata)) {
                                    return;
                                }

                                var columns = ng.extend(
                                    response.data.metadata.metrics,
                                    response.data.metadata.processedMetrics
                                );

                                $scope.data = response.data;
                                $scope.columns = [];

                                if (ng.isArray(response.data.reportData)) {
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
                                } else {
                                    $scope.columns = [
                                        {
                                            key: 'value',
                                            label: 'Value'
                                        }
                                    ];

                                    var data = ng.copy(response.data.reportData);

                                    $scope.data.reportData = [];
                                    ng.forEach(
                                        data,
                                        function (value, key)
                                        {
                                            $scope.data.reportData.push(
                                                {
                                                    label: columns[key],
                                                    value: value
                                                }
                                            );
                                        }
                                    );
                                }

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
