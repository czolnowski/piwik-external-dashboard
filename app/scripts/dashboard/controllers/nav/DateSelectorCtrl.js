(function (ng) {
    'use strict';

    var DateSelectorCtrl = function ($scope, $location, $routeParams, moment)
    {
        var vm = this;

        this.period = 'day';

        this.ranges = {
            'Last 7 days': [moment().subtract('days', 7), moment()],
            'Last 30 days': [moment().subtract('days', 30), moment()],
            'This month': [moment().startOf('month'), moment().endOf('month')]
        };

        if (ng.isDefined($routeParams.date)) {
            this.initializeDate($routeParams.date, $scope, moment);
        }

        $scope.$watch('dates', function (after, before) {
            if (after !== before) {
                if (vm.period === 'day') {
                    $location.search('date', after.startDate.format('YYYY-MM-DD'));
                } else {
                    $location.search(
                        'date',
                        [
                            after.startDate.format('YYYY-MM-DD'),
                            after.endDate.format('YYYY-MM-DD')
                        ].join(',')
                    );
                }
            }
        });
    };

    DateSelectorCtrl.prototype.initializeDate = function (date, $scope, moment)
    {
        if (date.indexOf(',') !== -1) {
            this.period = 'range';
            $scope.dates = {
                startDate: moment(date.split(',')[0]),
                endDate: moment(date.split(',')[1])
            };
        } else {
            $scope.dates = {
                startDate: moment(date),
                endDate: moment(date).add('days', 1)
            };
        }
    };

    DateSelectorCtrl.$inject = ['$scope', '$location', '$routeParams', 'moment'];

    ng.module('piwik-external-dashboard.dashboard').controller(
        'DashboardDateSelectorCtrl', DateSelectorCtrl
    );
})(window.angular);
