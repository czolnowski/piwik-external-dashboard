(function (ng) {
    'use strict';

    var Metric = function (name, key, description)
    {
        this.enabled = true;
        this.description = description;
        this.name = name;
        this.key = key;
    };

    ng.module('piwikExtDash.morris').factory(
        'Metric',
        [
            function ()
            {
                return Metric;
            }
        ]
    );
})(window.angular);
