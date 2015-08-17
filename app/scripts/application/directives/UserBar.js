(function (ng) {
    'use strict';

    ng.module('piwik-external-dashboard.application').directive(
        'applicationUserBar',
        [
            '$cookieStore', 'Authenticate', 'ASSETS_BASE_PATH',
            function ($cookieStore, Authenticate, ASSETS_BASE_PATH)
            {
                return {
                    replace: true,
                    templateUrl: ASSETS_BASE_PATH + 'views/application/user-bar.html',
                    link: function ($scope)
                    {
                        $scope.user = Authenticate.me;

                        $scope.logout = function ()
                        {
                            $cookieStore.remove('token');
                        };
                    }
                };
            }
        ]
    );
})(window.angular);
