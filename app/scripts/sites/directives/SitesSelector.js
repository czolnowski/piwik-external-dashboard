(function (ng) {
    'use strict';

    ng.module('piwik-external-dashboard.sites').directive(
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
