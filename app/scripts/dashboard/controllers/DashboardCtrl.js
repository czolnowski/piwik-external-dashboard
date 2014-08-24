(function (ng) {
    'use strict';

    var $timeout,
        $location,
        State,
        DashboardCtrl = function ($scope, _$location, _$timeout, _State, states, localState)
        {
            $timeout = _$timeout;
            $location = _$location;
            State = _State;

            this.localState = localState;
            this.dashboards = states;
            this.initialize($scope);
        };

    DashboardCtrl.prototype.initialize = function ($scope)
    {
        var vm = this;

        this.localState.load().then(
            function (dashboards)
            {
                vm.dashboards.add(dashboards);
                vm.current = vm.dashboards.getActive();
            },
            function ()
            {
                var state = new State();
                vm.current = state;
                vm.current.active = true;

                vm.dashboards.add(state);
            }
        );

        this.sortableOptions = {
            update: function ()
            {
                $timeout(function () {
                    vm.persist();
                });
            },
            cancel: '.add'
        };

        $scope.$on('sites.selectedSite', function (event, site) {
            if (ng.isDefined(site.idsite)) {
                $location.path('/' + site.idsite);
            }
        });
    };

    DashboardCtrl.prototype.persist = function ()
    {
        this.localState.persist(this.dashboards.states);
    };

    DashboardCtrl.prototype.add = function ()
    {
        this.dashboards.add(new State());
    };

    DashboardCtrl.prototype.change = function (current)
    {
        this.current.active = false;
        this.current = current;
        this.current.active = true;

        this.persist();
    };

    DashboardCtrl.prototype.remove = function ()
    {
        if (!this.canRemove()) {
            return;
        }

        var vm = this;

        this.dashboards.remove(this.current).then(
            function (current)
            {
                vm.current = current;
                vm.current.active = true;

                vm.persist();
            }
        );
    };

    DashboardCtrl.prototype.canRemove = function ()
    {
        return this.dashboards.getSize() > 1;
    };

    DashboardCtrl.$inject = [
        '$scope', '$location', '$timeout',
        'DashboardState', 'DashboardStates', 'DashboardLocalState'
    ];

    ng.module('piwik-external-dashboard.dashboard')
    .controller('DashboardCtrl', DashboardCtrl)
    .config(
        [
            '$routeProvider',
            function ($routeProvider) {
                $routeProvider.when(
                    '/:idSite?',
                    {
                        templateUrl: 'views/dashboard/index.html',
                        controller: 'DashboardCtrl',
                        controllerAs: 'dashboard',
                        auth: true
                    }
                );
            }
        ]
    );
})(window.angular);
