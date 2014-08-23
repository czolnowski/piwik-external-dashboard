(function (ng) {
    'use strict';

    ng.module('piwik-external-dashboard.tables').directive(
        'tablePagination',
        [
            function ()
            {
                return {
                    templateUrl: 'views/tables/pagination.html'
                };
            }
        ]
    );
})(window.angular);
