(function (ng) {
    'use strict';

    ng.module('piwik-external-dashboard.widget').directive(
        'singleWidget',
        [
            'ASSETS_BASE_PATH',
            function (ASSETS_BASE_PATH)
            {
                return {
                    restrict: 'AC',
                    transclude: true,
                    scope: {
                        report: '=',
                        dashboard: '='
                    },
                    templateUrl: ASSETS_BASE_PATH + 'views/widget/single.html',
                    controller: [
                        '$scope', '$routeParams',
                        function ($scope, $routeParams)
                        {
                            this.report = $scope.report.report;
                            $scope.hasIdSite = ng.isDefined($routeParams.idSite);
                        }
                    ]
                };
            }
        ]
    );
})(window.angular);
