(function (ng) {
    'use strict';

    ng.module('piwik-external-dashboard.widget').directive(
        'singleWidget',
        [
            function ()
            {
                return {
                    restrict: 'AC',
                    transclude: true,
                    scope: {
                        report: '=',
                        dashboard: '='
                    },
                    templateUrl: 'views/widget/single.html',
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
