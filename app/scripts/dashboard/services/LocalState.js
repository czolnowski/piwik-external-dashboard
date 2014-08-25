(function (ng) {
    'use strict';

    var LocalState = function (dashboardStateKey, localStorageService, State, $q)
    {
        var vm = this;

        vm.load = function ()
        {
            var deferred = $q.defer(),
                dashboards = localStorageService.get(dashboardStateKey);

            if (dashboards === null) {
                deferred.reject();
            } else {
                for (var index = 0; index < dashboards.length; ++index) {
                    var state = new State();
                    dashboards[index] = state.unserialize(dashboards[index]);
                }

                deferred.resolve(dashboards);
            }

            return deferred.promise;
        };

        vm.persist = function (dashboards)
        {
            var data = [];

            ng.forEach(
                dashboards,
                function (state)
                {
                    data.push(state.serialize());
                }
            );

            data = ng.toJson(data);

            if (localStorageService.isSupported) {
                localStorageService.add(dashboardStateKey, data);
            } else {
                localStorageService.cookie.add(dashboardStateKey, data);
            }
        };
    };

    LocalState.$inject = ['dashboardStateKey', 'localStorageService', 'DashboardState', '$q'];

    ng.module('piwik-external-dashboard.dashboard').service(
        'DashboardLocalState', LocalState
    );
})(angular);
