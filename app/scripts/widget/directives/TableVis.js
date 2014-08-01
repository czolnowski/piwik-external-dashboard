(function (ng) {
    'use strict';

    ng.module('piwikExtDash.widget').directive('tablevis', function() {

        return {
            restrict: 'A',
            templateUrl: 'views/widget/tablevis.html',
            controller: 'TableVisCtrl',
            controllerAs: 'table'
        };
    });
})(angular);