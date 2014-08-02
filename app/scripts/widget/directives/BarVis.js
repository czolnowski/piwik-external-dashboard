(function (ng) {
    'use strict';

    ng.module('piwikExtDash.widget').directive('barVis', ['chartsColors', function(chartsColors) {

        return {
            require: '^report',
            restrict: 'A',
            templateUrl: 'views/widget/barVis.html',
            controller: 'BarVisCtrl',
            controllerAs: 'bar',
            link: function($scope, elem, attrs, myReportCtrl) {
                myReportCtrl.report.fetch().then(function (response) {
                    var metrics = {},
                        labels = [],
                        datasets = [],
                        colorIndex = 0;

                    $scope.legend = [];
                    for (var column in response.data.columns) {
                        metrics[column] = response.data.columns[column];

                        datasets.push(
                            {
                                label: response.data.columns[column],
                                data: []
                            }
                        );

                        if (column !== 'label') {
                            if (ng.isDefined(chartsColors[colorIndex])) {
                                $scope.legend.push(
                                    {
                                        label: response.data.columns[column],
                                        color: chartsColors[colorIndex].strokeColor,
                                        enableColor: chartsColors[colorIndex].strokeColor,
                                        disableColor: chartsColors[colorIndex].fillColor
                                    }
                                );
                            }

                            ng.extend(datasets[colorIndex], chartsColors[colorIndex]);
                            ++colorIndex;
                        }
                    }

                    if (ng.isDefined(response.data.reportData)) {
                        for (var index in response.data.reportData) {
                            if (response.data.reportData.hasOwnProperty(index)) {
                                if (index > myReportCtrl.report.getNumberOfColumnsForBar() - 1) {
                                    break;
                                }

                                labels.push(response.data.reportData[index].label);
                                for (var columnIndex in response.data.reportData[index]) {
                                    if (response.data.reportData[index].hasOwnProperty(columnIndex)) {
                                        for (var dataSetIndex in datasets) {
                                            if (datasets.hasOwnProperty(dataSetIndex)) {
                                                if (datasets[dataSetIndex].label === metrics[columnIndex]
                                                    && ng.isNumber(response.data.reportData[index][columnIndex])) {
                                                    datasets[dataSetIndex].data.push(response.data.reportData[index][columnIndex]);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

//                    for (var i = 0; i < myReportCtrl.report.getNumberOfColumnsForBar(); ++i) {
//                        if (i % skipFor === 0) {
//                            labels.push('');
//                        } else {
//                            labels.push(date.format("YYYY-MM-DD"));
//                        }
//
//                        date = date.add('days', 1);
//                    }
//
//                    if (ng.isDefined(response.data.reportData)) {
//                        for (var index in response.data.reportData) {
//                            if (response.data.reportData.hasOwnProperty(index)) {
//                                for (var columnIndex in response.data.reportData[index]) {
//                                    if (response.data.reportData[index].hasOwnProperty(columnIndex)) {
//                                        for (var dataSetIndex in datasets) {
//                                            if (datasets.hasOwnProperty(dataSetIndex)) {
//                                                if (datasets[dataSetIndex].label === metrics[columnIndex]
//                                                    && ng.isNumber(response.data.reportData[index][columnIndex])) {
//                                                    datasets[dataSetIndex].data.push(response.data.reportData[index][columnIndex]);
//                                                }
//                                            }
//                                        }
//                                    }
//                                }
//                            }
//                        }
//                    }

                    for (dataSetIndex in datasets) {
                        if (datasets.hasOwnProperty(dataSetIndex)) {
                            if (datasets[dataSetIndex].data.length < 1) {
                                datasets.splice(dataSetIndex, 1);
                            }
                        }
                    }

                    $scope.report = {
                        labels: labels,
                        datasets: datasets
                    };
                });
            }
        };
    }]);
})(angular);
