(function (ng) {
    'use strict';

    ng.module('piwikExtDash.widget').directive(
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
                        '$scope',
                        function ($scope)
                        {
                            this.report = $scope.report;
                        }
                    ]
                };
            }
        ]
    );
})(window.angular);
