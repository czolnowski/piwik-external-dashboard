(function (ng) {
    'use strict';

    ng.module('piwikExtDash.widget').directive('evolutionVis', ['moment', 'chartsColors', function(moment, chartsColors) {

        return {
            require: '^report',
            restrict: 'A',
            templateUrl: 'views/widget/evolutionVis.html',
            controller: 'EvolutionVisCtrl',
            controllerAs: 'evolution',
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

                        if (ng.isDefined(chartsColors[colorIndex]) && column !== 'label') {
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

                    var dateSplit = myReportCtrl.report.getDate().split(','),
                        dateFrom = moment(dateSplit[0]),
                        dateTo = moment(dateSplit[1]);

                    moment().range(dateFrom, dateTo).by('days', function(moment) {
                        labels.push(moment.format("YYYY-MM-DD"));
                    });

                    var numberOfTicks = 12;
                    if (labels.length > numberOfTicks) {
                        var skip = (labels.length - (labels.length % numberOfTicks)) / numberOfTicks;
                        for (var i = 0; i < labels.length; ++i) {
                            if (i % skip !== 0) {
                                labels[i] = '';
                            }
                        }
                    }

                    if (ng.isDefined(response.data.reportData)) {
                        for (var index in response.data.reportData) {
                            if (response.data.reportData.hasOwnProperty(index)) {
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
