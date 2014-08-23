(function (ng, Firebase) {
    'use strict';

    var ReportsStateFetcher = function ($firebase, md5, localStorageService, $q)
    {
        var vm = this;

        vm.synced = {};

        vm.getSync = function (key)
        {
            if (!ng.isDefined(vm.synced[key])) {
                vm.synced[key] = $firebase(
                    new Firebase('https://piwik-ext-dashboard.firebaseio.com/' + key)
                );
            }

            return vm.synced[key];
        };

        vm.load = function (key, id)
        {
            var deferred = $q.defer();

            if (ng.isDefined(id) && id.length > 0) {
                if (!ng.isDefined(vm.synced[key])) {
                    vm.synced[key] = vm.getSync(key);
                }

                vm.getSync(key).$asObject().$loaded().then(
                    function (response)
                    {
                        deferred.resolve(response[id]);
                    }
                );

            } else {
                deferred.resolve(localStorageService.get('reports'));
            }

            return deferred.promise;
        };

        vm.save = function (key, data)
        {
            var deferred = $q.defer(),
                name = md5(data);

            if (name in vm.getSync(key).$asObject()) {
                deferred.resolve(name);
            } else {
                vm.getSync(key).$set(name, data).then(function () {
                    deferred.resolve(name);
                });
            }

            return deferred.promise;
        };

        vm.persist = function (key, data)
        {
            if (localStorageService.isSupported) {
                localStorageService.add(key, data);
            } else {
                localStorageService.cookie.add(key, data);
            }
        };
    };

    ReportsStateFetcher.$inject = [
        "$firebase", "md5", "localStorageService", "$q"
    ];

    ng.module('piwik-external-dashboard.dashboard').service('ReportsStateFetcher', ReportsStateFetcher);
})(window.angular, window.Firebase);
