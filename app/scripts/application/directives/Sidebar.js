(function (ng) {
    'use strict';

    ng.module('piwikExtDash.application').directive(
        'applicationSidebar',
        [
            function ()
            {
                return {
                    templateUrl: 'views/application/sidebar.html',
                    scope: {
                        active: '@'
                    }
                };
            }
        ]
    );
})(window.angular);
