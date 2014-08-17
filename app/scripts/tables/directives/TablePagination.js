(function (ng) {
    'use strict';

    ng.module('piwikExtDash.tables').directive(
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
