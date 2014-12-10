(function (ng) {
    'use strict';

    ng.module('piwik-external-dashboard.configurations', []).config(
        ['CONFIG', 'ConfiguratorProvider', function (config, configurator) {
            configurator.set(config);
        }]
    );
})(window.angular);
