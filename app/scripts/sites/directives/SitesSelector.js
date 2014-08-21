(function (ng) {
    'use strict';

    ng.module('piwikExtDash.sites').directive(
        'sitesSelector',
        [
            function ()
            {
                return {
                    controller: 'SitesSelectorCtrl',
                    templateUrl: 'views/sites/selector.html',
                    replace: true
                };
            }
        ]
    );
})(angular);
