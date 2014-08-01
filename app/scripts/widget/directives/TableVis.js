(function (ng) {
    'use strict';

    ng.module('piwikExtDash.widget').directive('tablevis', function() {

        return {
            require: '^report',
            restrict: 'A',
            templateUrl: 'views/widget/tablevis.html',
            controller: 'TableVisCtrl',
            controllerAs: 'table',
            link: function($scope, elem, attrs, myReportCtrl) {
                $scope.report = myReportCtrl;
            }
        };
    });
})(angular);