(function (ng) {
    'use strict';

    var States = function ($q) {
        var vm = this;

        vm.states = [];

        vm.getActive = function ()
        {
            for (var index in vm.states) {
                if (vm.states.hasOwnProperty(index)) {
                    if (vm.states[index].active) {
                        return vm.states[index];
                    }
                }
            }

            return false;
        };

        vm.add = function (state)
        {
            if (ng.isArray(state)) {
                ng.forEach(
                    state,
                    function (element)
                    {
                        vm.add(element);
                    }
                );
            } else {
                vm.states.push(state);
            }
        };

        vm.getSize = function ()
        {
            return vm.states.length;
        };

        vm.remove = function (state)
        {
            var index = vm.states.indexOf(state),
                deferred = $q.defer();

            if (index > -1) {
                var nextIndex = index - 1;
                if (nextIndex < 0) {
                    nextIndex = 0;
                }

                vm.states.splice(index, 1);
                deferred.resolve(vm.states[nextIndex]);
            } else {
                deferred.reject();
            }

            return deferred.promise;
        };

        vm.clear = function ()
        {
            vm.states = [];
        };
    };

    States.$inject = ['$q'];

    ng.module('piwik-external-dashboard.dashboard').service(
        'DashboardStates',
        States
    );
})(window.angular);
