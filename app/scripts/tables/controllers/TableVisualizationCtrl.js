(function (ng) {
    'use strict';

    var TableVisualizationCtrl = function ($scope, tablePaginationService)
    {
        $scope.dimensions = {
            page: 1,
            perPage: 10,
            total: 100,
            sortBy: 'nb_visits',
            sortOrder: 'desc'
        };

        $scope.getFrom = function ()
        {
            return ($scope.dimensions.page - 1) * $scope.dimensions.perPage;
        };

        $scope.getTo = function ()
        {
            return $scope.dimensions.page * $scope.dimensions.perPage;
        };

        $scope.changePage = function ($event, page) {
            $event.preventDefault();

            $scope.dimensions.page = page.number;
        };

        $scope.sortBy = function (column)
        {
            if ($scope.dimensions.sortBy === column) {
                $scope.dimensions.sortOrder = $scope.dimensions.sortOrder === 'asc' ? 'desc' : 'asc';
            } else {
                $scope.dimensions.sortOrder = 'desc';
                $scope.dimensions.sortBy = column;
            }
        };

        $scope.$watch("dimensions.page", function () {
            $scope.pages = tablePaginationService.generatePagesArray($scope.dimensions);
        });

        $scope.$watch("dimensions.perPage", function () {
            $scope.pages = tablePaginationService.generatePagesArray($scope.dimensions);
        });

        $scope.$watch("dimensions.total", function () {
            $scope.pages = tablePaginationService.generatePagesArray($scope.dimensions);
        });

        $scope.$watch("data", function () {
            if (ng.isDefined($scope.data)) {
                $scope.dimensions.total = $scope.data.reportData.length;
            }
        });
    };

    ng.module('piwik-external-dashboard.tables').controller(
        'TableVisualizationCtrl',
        [
            "$scope", "TablePaginationService",
            TableVisualizationCtrl
        ]
    );
})(window.angular);
