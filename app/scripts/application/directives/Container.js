(function (ng) {
    'use strict';

    ng.module('piwikExtDash.application').directive(
        'applicationContainer',
        [
            function ()
            {
                return {
                    templateUrl: 'views/application/container.html',
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
