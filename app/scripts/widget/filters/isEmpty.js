
(function (ng) {
    'use strict';
    ng.module('piwikExtDash.widget').filter('isEmpty', function () {

        var bar;
        return function (value) {
            
            if (ng.isArray(value)) {
                return !value || !value.length;
            }

            if (ng.isObject(value)) {
                for (bar in value) {
                    if (value.hasOwnProperty(bar)) {
                        return false;
                    }
                }
                return true;
            }

            return !!value;
        };
    });
})(angular);
