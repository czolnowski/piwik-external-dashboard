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
                    link: function($scope, elem, attrs, ctrl) {
                        $scope.data = [];
                        $scope.xkey = 'label';
                        $scope.ykeys = [];
                        $scope.labels = [];

                        ctrl.report.report.fetch().then(function (response) {
                            if (ng.isDefined(response.data.metadata)) {
                                if (ng.isDefined(response.data.metadata.metrics)) {
                                    ng.forEach(
                                        response.data.metadata.metrics,
                                        function (name, key)
                                        {
                                            $scope.ykeys.push(key);
                                            $scope.labels.push(name);
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
