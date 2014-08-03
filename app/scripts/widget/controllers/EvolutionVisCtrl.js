(function (ng) {
    'use strict';

    var EvolutionVisCtrl = function ($scope)
    {
        var disabledDataSets = [];

        $scope.options = {
            animation: true,
            responsive: true,
            showTooltips: true
        };

        $scope.switchDataSet = function (item)
        {
            var enable = true;
            if (item.color === item.enableColor) {
                item.color = item.disableColor;
                enable = false;
            } else {
                item.color = item.enableColor;
            }

            if (!enable) {
                for (var index in $scope.report.datasets) {
                    if ($scope.report.datasets.hasOwnProperty(index)) {
                        var dataset = $scope.report.datasets[index];
                        if (item.label === dataset.label) {
                            disabledDataSets.push(ng.copy(dataset));
                            $scope.report.datasets.splice(index, 1);
                        }
                    }
                }
            } else {
                for (var index in disabledDataSets) {
                    if (disabledDataSets.hasOwnProperty(index)) {
                        var dataset = disabledDataSets[index];
                        if (item.label === dataset.label) {
                            $scope.report.datasets.push(ng.copy(dataset));
                            disabledDataSets.splice(index, 1);
                        }
                    }
                }
            }
        };
    };

    ng.module('piwikExtDash.widget').controller("EvolutionVisCtrl", [
        "$scope",
        EvolutionVisCtrl
    ]);
})(angular);
