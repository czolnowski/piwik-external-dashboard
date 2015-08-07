(function (ng) {
    'use strict';

    ng.module('piwik-external-dashboard.widget').directive(
        'singleWidgetFooter',
        [
            function ()
            {
                return {
                    restrict: 'AC',
                    scope: {
                        report: '=',
                        dashboard: '='
                    },
                    replace: true,
                    templateUrl: 'views/widget/single/footer.html',
                    controller: [
                        '$scope',
                        function ($scope)
                        {
                            $scope.sizes = [];
                            for (var i = 1; i < 13; ++i) {
                                $scope.sizes.push(i);
                            }

                            $scope.visualizations = ['evolution', 'table', 'bar', 'pie'];
                        }
                    ]
                };
            }
        ]
    );
})(window.angular);
