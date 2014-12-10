(function (ng) {
    'use strict';

    var Configurator = function ()
    {
        console.log('Configurator init')

        this.set = function ()
        {
            console.log('set', arguments)
        }

        this.$get = [
            function ()
            {

            }
        ];
    };

    ng.module('piwik-external-dashboard.configurations').provider(
        'Configurator', Configurator
    );
})(window.angular);
