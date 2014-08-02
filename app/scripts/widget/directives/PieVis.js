(function (ng) {
    'use strict';

    ng.module('piwikExtDash.widget').directive('pieVis', ['chartsColors', function(chartsColors) {

        return {
            require: '^report',
            restrict: 'A',
            templateUrl: 'views/widget/pieVis.html',
            controller: 'PieVisCtrl',
            controllerAs: 'pie',
            link: function($scope, elem, attrs, myReportCtrl) {
                myReportCtrl.report.fetch().then(function (response) {
                    var data = [],
                        colorIndex = 0;

                    $scope.legend = [];

                    if (ng.isDefined(response.data.reportData)) {
                        for (var index in response.data.reportData) {
                            if (response.data.reportData.hasOwnProperty(index)) {
                                if (index > myReportCtrl.report.getNumberOfColumnsForPie() - 1) {
                                    break;
                                }

                                data.push(
                                    {
                                        value: response.data.reportData[index].nb_visits,
                                        color: chartsColors[colorIndex].color,
                                        highlight: chartsColors[colorIndex].highlight,
                                        label: response.data.reportData[index].label
                                    }
                                );

                                if (ng.isDefined(chartsColors[colorIndex])) {
                                    $scope.legend.push(
                                        {
                                            label: response.data.reportData[index].label,
                                            color: chartsColors[colorIndex].color
                                        }
                                    );
                                }

                                ++colorIndex;
                            }
                        }
                    }

                    $scope.report = data;
                });
            }
        };
    }]);
})(angular);
