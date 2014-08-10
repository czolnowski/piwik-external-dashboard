(function (ng) {
    ng.module('piwikExtDash.morris').directive(
        "morrisEvolutionGraphHover",
        [
            function ()
            {
                return {
                    restrict: 'AE',
                    scope: {
                        label: '@',
                        metrics: '=',
                        values: '='
                    },
                    replace: true,
                    template:
                        '<div>' +
                            '<div class="morris-hover-row-label" ng-bind="label"></div>' +
                            '<div ng-repeat="metric in metrics"' +
                                'ng-if="metric.enabled"' +
                                'ng-style="{color: metric.color}"' +
                                'class="morris-hover-point">' +
                        '       {{ metric.name }}: {{ values[metric.key] }}' +
                            '</div>' +
                        '</div>'
                };
            }
        ]
    );
})(window.angular);
