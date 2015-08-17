(function (ng) {
    'use strict';

    ng.module('piwik-external-dashboard.widget').directive(
        'singleWidgetFooter',
        [
            'ASSETS_BASE_PATH',
            function (ASSETS_BASE_PATH)
            {
                return {
                    restrict: 'AC',
                    scope: {
                        report: '=',
                        dashboard: '='
                    },
                    replace: true,
                    templateUrl: ASSETS_BASE_PATH + 'views/widget/single/footer.html',
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
