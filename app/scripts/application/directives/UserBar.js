(function (ng) {
    'use strict';

    ng.module('piwikExtDash.application').directive(
        'applicationUserBar',
        [
            "$cookieStore", "Authenticate",
            function ($cookieStore, Authenticate)
            {
                return {
                    replace: true,
                    templateUrl: 'views/application/user-bar.html',
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
