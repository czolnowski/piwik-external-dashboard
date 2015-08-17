(function (ng) {
    'use strict';

    ng.module('piwik-external-dashboard.sites').directive(
        'sitesSelector',
        [
            'ASSETS_BASE_PATH',
            function (ASSETS_BASE_PATH)
            {
                return {
                    controller: 'SitesSelectorCtrl',
                    templateUrl: ASSETS_BASE_PATH + 'views/sites/selector.html',
                    replace: true
                };
            }
        ]
    );
})(angular);
