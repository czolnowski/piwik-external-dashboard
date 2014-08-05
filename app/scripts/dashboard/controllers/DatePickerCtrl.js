(function (ng) {
    'use strict';

    var DatePickerCtrl = function ($scope, $location, $routeParams, moment)
    {
        var that = this;

        this.period = 'day';

        this.ranges = {
            'Last 7 days': [moment().subtract('days', 7), moment()],
            'Last 30 days': [moment().subtract('days', 30), moment()],
            'This month': [moment().startOf('month'), moment().endOf('month')]
        };

        if (ng.isDefined($routeParams.date)) {
            if ($routeParams.date.indexOf(',') !== -1) {
                this.period = 'range';
                $scope.dates = {
                    startDate: moment($routeParams.date.split(',')[0]),
                    endDate: moment($routeParams.date.split(',')[1])
                };
            } else {
                $scope.dates = {
                    startDate: moment($routeParams.date),
                    endDate: moment($routeParams.date).add('days', 1)
                };
            }
        }

        $scope.$watch('dates', function (after, before) {
            if (after !== before) {
                if (that.period === 'day') {
                    $location.search('date', after.startDate.format("YYYY-MM-DD"));
                } else {
                    $location.search(
                        'date',
                        [
                            after.startDate.format("YYYY-MM-DD"),
                            after.endDate.format("YYYY-MM-DD")
                        ].join(',')
                    );
                }
            }
        });
    };

    ng.module('piwikExtDash.dashboard').controller(
        'DatePickerCtrl',
        [
            "$scope", "$location", "$routeParams", "moment",
            DatePickerCtrl
        ]
    );
})(window.angular);
