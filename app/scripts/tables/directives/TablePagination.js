(function (ng) {
    'use strict';

    ng.module('piwik-external-dashboard.tables').directive(
        'tablePagination',
        [
            'ASSETS_BASE_PATH',
            function (ASSETS_BASE_PATH)
            {
                return {
                    templateUrl: ASSETS_BASE_PATH + 'views/tables/pagination.html'
                };
            }
        ]
    );
})(window.angular);
