(function (ng) {
    'use strict';

    var PieVisCtrl = function ($scope)
    {
        $scope.options = {
            animation: true,
            responsive: true,
            showTooltips: true
        };
    };

    ng.module('piwikExtDash.widget').controller("PieVisCtrl", [
        "$scope",
        PieVisCtrl
    ]);
})(angular);
