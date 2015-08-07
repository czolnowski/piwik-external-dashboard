(function () {
    'use strict';

    var module = angular.module('piwik-external-dashboard.application');

    module.service('ApplicationWindow', function ($window) {
        var windowElement = angular.element($window);

        this.getDimensions = function () {
            return {
                'h': windowElement.height(),
                'w': windowElement.width()
            };
        };

        this.onResize = function (callback) {
            windowElement.bind('resize', callback);
        };
    });
})();
