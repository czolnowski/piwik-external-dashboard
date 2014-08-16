(function (ng) {
    'use strict';

    ng.module('piwikExtDash.widget').filter(
        'isEmpty',
        function ()
        {
            return function (value)
            {
                if (ng.isArray(value)) {
                    return !value || !value.length;
                }

                if (ng.isObject(value)) {
                    var index;
                    for (index in value) {
                        if (value.hasOwnProperty(index)) {
                            return false;
                        }
                    }
                    return true;
                }

                return !!value;
            };
        }
    );
})(angular);
