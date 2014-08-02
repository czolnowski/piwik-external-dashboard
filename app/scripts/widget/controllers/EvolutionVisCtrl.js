(function (ng) {
    'use strict';

    var EvolutionVisCtrl = function ($scope)
    {
        $scope.options = {};
    };

    ng.module('piwikExtDash.widget').controller("EvolutionVisCtrl", [
        "$scope",
        EvolutionVisCtrl
    ]);
})(angular);
