(function (ng) {
    'use strict';

    ng.module('piwikExtDash.widget').directive('tablevis', [function() {

        return {
            require: '^report',
            restrict: 'AC',
            templateUrl: 'views/widget/tablevis.html',
            controller: 'TableVisCtrl',
            controllerAs: 'table',
            link: function($scope, elem, attrs, myReportCtrl) {

                myReportCtrl.report.fetch().then(function (response) {
                    for (var index in response.data) {
                        if (response.data.hasOwnProperty(index)) {
                            $scope[index] = response.data[index];
                        }
                    }
                });
            }
        };
    }]);
})(angular);