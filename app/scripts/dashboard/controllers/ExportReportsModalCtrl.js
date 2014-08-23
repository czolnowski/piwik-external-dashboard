(function (ng) {
    'use strict';

    var DashboardExportReportsModalCtrl = function ($scope, $modalInstance, key, md5)
    {
        $scope.name = "";
        $scope.key = md5(key);

        $scope.save = function ()
        {
            $modalInstance.close();
        };

        $scope.cancel = function ()
        {
            $modalInstance.dismiss('cancel');
        };
    };

    DashboardExportReportsModalCtrl.$inject = [
        "$scope", "$modalInstance", "key", "md5"
    ];

    ng.module('piwik-external-dashboard.dashboard').controller(
        'DashboardExportReportsModalCtrl',
        DashboardExportReportsModalCtrl
    );
})(window.angular);
