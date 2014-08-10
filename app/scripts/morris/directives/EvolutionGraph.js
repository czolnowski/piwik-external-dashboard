(function (ng) {
    'use strict';

    ng.module('piwikExtDash.morris').directive(
        'evolutionGraph',
        [
            function ()
            {
                return {
                    require: '^singleWidget',
                    restrict: 'AE',
                    templateUrl: 'views/morris/evolution/graph.html',
                    controller: [
                        "$scope", "moment", "metricsColors", "$rootScope", "$compile",
                        function ($scope, moment, metricsColors, $rootScope, $compile)
                        {
                            var that = this;

                            $scope.data = [];
                            $scope.xkey = 'label';
                            $scope.ykeys = [];
                            $scope.labels = [];

                            $scope.metricsColors = ng.copy(metricsColors);
                            $scope.metrics = [];

                            $scope.dateFormat = function (date)
                            {
                                return moment(date).format("YYYY-MM-DD");
                            };

                            $scope.toggleMetric = function (index)
                            {
                                if (!ng.isDefined(that.graph)) {
                                    return;
                                }

                                if (!ng.isDefined($scope.metrics[index])) {
                                    return;
                                }

                                var metric = $scope.metrics[index];

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
                                    $scope.metricsColors.splice(index, 0, metric.color);
                                } else {
                                    var localIndex = $scope.ykeys.indexOf(metric.key);

                                    $scope.labels.splice(localIndex, 1);
                                    $scope.ykeys.splice(localIndex, 1);
                                    $scope.metricsColors.splice(localIndex, 1);
                                }

                                that.graph.setData($scope.data, true);
                            };

                            $scope.setGraphInstance = function (graph)
                            {
                                that.graph = graph;
                            };

                            $scope.hoverCallback = function (index, options, content, row)
                            {
                                var html = '<div data-evolution-graph-hover ' +
                                        'label="' + options.dateFormat(row.label) + '" ' +
                                        'metrics="metrics" ' +
                                        'values="values"></div>',
                                    scope = $rootScope.$new();

                                scope.metrics = $scope.metrics;
                                scope.values = row;
                                scope.label = options.dateFormat(row.label);

                               return $compile(html)(scope);
                            }
                        }
                    ],
                    link: function($scope, elem, attrs, ctrl) {
                        ctrl.report.report.fetch().then(function (response) {
                            if (ng.isDefined(response.data.metadata)) {
                                if (ng.isDefined(response.data.metadata.metrics)) {
                                    var i = -1;
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
                                                    color: $scope.metricsColors[++i],
                                                    key: key
                                                }
                                            );
                                        }
                                    );
                                }
                            }

                            if (ng.isDefined(response.data.reportData)) {
                                ng.forEach(
                                    response.data.reportData,
                                    function (values, key)
                                    {
                                        values[$scope.xkey] = new Date(key).getTime();
                                        $scope.data.push(values);
                                    }
                                );
                            }
                        });
                    }
                };
            }
        ]
    );
})(window.angular);
