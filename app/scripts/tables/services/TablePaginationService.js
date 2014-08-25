(function (ng) {
    'use strict';

    var TablePaginationService = function ()
    {

    };

    TablePaginationService.prototype.generatePagesArray = function (dimensions) {
        var maxBlocks, maxPage, maxPivotPages, minPage, numPages, pages;

        var currentPage = dimensions.page,
            totalItems = dimensions.total,
            pageSize = dimensions.perPage;

        maxBlocks = 11;
        pages = [];
        numPages = Math.ceil(totalItems / pageSize);
        if (numPages > 1) {
            pages.push({
                type: 'prev',
                number: Math.max(1, currentPage - 1),
                active: currentPage > 1
            });
            pages.push({
                type: 'first',
                number: 1,
                active: currentPage > 1
            });
            maxPivotPages = Math.round((maxBlocks - 5) / 2);
            minPage = Math.max(2, currentPage - maxPivotPages);
            maxPage = Math.min(numPages - 1, currentPage + maxPivotPages * 2 - (currentPage - minPage));
            minPage = Math.max(2, minPage - (maxPivotPages * 2 - (maxPage - minPage)));
            var i = minPage;
            while (i <= maxPage) {
                if ((i === minPage && i !== 2) || (i === maxPage && i !== numPages - 1)) {
                    pages.push({
                        type: 'more',
                        active: false
                    });
                } else {
                    pages.push({
                        type: 'page',
                        number: i,
                        active: currentPage !== i
                    });
                }
                i++;
            }
            pages.push({
                type: 'last',
                number: numPages,
                active: currentPage !== numPages
            });
            pages.push({
                type: 'next',
                number: Math.min(numPages, currentPage + 1),
                active: currentPage < numPages
            });
        }
        return pages;
    };

    ng.module('piwik-external-dashboard.tables').service(
        'TablePaginationService',
        [
            TablePaginationService
        ]
    );
})(window.angular);
