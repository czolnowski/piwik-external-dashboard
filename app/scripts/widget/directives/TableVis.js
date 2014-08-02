(function (ng) {
    'use strict';

    ng.module('piwikExtDash.widget').directive('tablevis', [function() {

        return {
            require: '^report',
            restrict: 'A',
            templateUrl: 'views/widget/tablevis.html',
            controller: 'TableVisCtrl',
            controllerAs: 'table',
            link: function($scope, elem, attrs, myReportCtrl) {
                function fetchReport (date) {
                    $scope.loading = true;

                    myReportCtrl.report.fetch(date).then(function (response) {
                        $scope.loading = false;
                        for (var index in response.data) {
                            if (response.data.hasOwnProperty(index)) {
                                $scope[index] = response.data[index];
                            }
                        }
                    });
                }

                fetchReport(null);

                $scope.$on('dateUpdated', function (event, date) {
                    fetchReport(date);
                });
            }
        };
    }]);
})(angular);