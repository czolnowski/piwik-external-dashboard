(function () {
    'use strict';

    var Fetchers = function (configuration) {
            this.source = configuration.source;
            this.fetchers = {};
        },
        module = angular.module('piwik-external-dashboard.application');

    Fetchers.prototype.add = function (name, fetcher) {
        this.fetchers[name] = fetcher;
    };

    Fetchers.prototype.get = function () {
        if (this.fetchers[this.source]) {
            return this.fetchers[this.source];
        }

        return false;
    };

    module.factory('Fetchers', function () {
        return Fetchers;
    });
})();
