(function (ng) {
    'use strict';

    ng.module('piwik-external-dashboard.tables').filter('min', function() {
        return function(input, compareTo) {
            if (!ng.isNumber(input)) {
                return input;
            }

            return Math.min(input, compareTo);
        };
    });
})(window.angular);
