(function (ng) {
    'use strict';

    ng.module('piwikExtDash.widget').directive('evolutionVis', ['moment', function(moment) {

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
                        datasets = [];

                    for (var column in response.data.columns) {
                        metrics[column] = response.data.columns[column];

                        datasets.push(
                            {
                                label: response.data.columns[column],
                                fillColor: "rgba(220,220,220,0.2)",
                                strokeColor: "rgba(220,220,220,1)",
                                pointColor: "rgba(220,220,220,1)",
                                pointStrokeColor: "#fff",
                                pointHighlightFill: "#fff",
                                pointHighlightStroke: "rgba(220,220,220,1)",
                                data: [65, 59, 80, 81, 56, 55, 40, 40, 40, 40]
                            }
                        );
                    }

                    var date = moment(myReportCtrl.report.getDate().split(',')[0]);
                    for (var i = 0; i < 10; ++i) {
                        labels.push(i + 1);
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
