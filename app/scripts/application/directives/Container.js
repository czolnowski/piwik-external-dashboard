(function (ng) {
    'use strict';

    ng.module('piwik-external-dashboard.application').directive(
        'applicationContainer',
        [
            'ASSETS_BASE_PATH',
            function (ASSETS_BASE_PATH)
            {
                return {
                    templateUrl: ASSETS_BASE_PATH + 'views/application/container.html',
                    transclude: true,
                    replace: true,
                    link: function (scope)
                    {
                        scope.states = {
                            sm: {
                                toggled: false
                            },
                            md: {
                                toggled: false
                            }
                        };
                    }
                };
            }
        ]
    );
})(window.angular);
