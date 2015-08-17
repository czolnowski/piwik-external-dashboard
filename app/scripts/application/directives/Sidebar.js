(function (ng) {
    'use strict';

    ng.module('piwik-external-dashboard.application').directive(
        'applicationSidebar',
        [
            'ASSETS_BASE_PATH',
            function (ASSETS_BASE_PATH)
            {
                return {
                    templateUrl: ASSETS_BASE_PATH + 'views/application/sidebar.html',
                    link: function (scope, element, attrs)
                    {
                        scope.menu = {
                            show: false,
                            sm: {
                                toggle: false
                            },
                            md: {
                                toggle: false
                            }
                        };

                        scope.$watch('menu.sm.toggle', function (newValue, oldValue) {
                            if (newValue !== oldValue) {
                                scope.states.sm.toggle = newValue;
                            }
                        });

                        scope.$watch('menu.md.toggle', function (newValue, oldValue) {
                            if (newValue !== oldValue) {
                                scope.states.md.toggle = newValue;
                            }
                        });

                        scope.active = attrs.active;
                    }
                };
            }
        ]
    );
})(window.angular);
