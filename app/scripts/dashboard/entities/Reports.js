(function (ng) {
    var Reports = function (idSite)
    {
        this.idSite = idSite;
    }

    var _$http = null;

    Reports.prototype.fetch = function ()
    {
        return _$http.post(
            '/api/API/getReportMetadata',
            {
                idSite: this.idSite
            }
        );
    };

    ng.module('piwikExtDash.dashboard').factory('Reports', [
        "$http",
        function ($http)
        {
            _$http = $http;

            return Reports;
        }
    ]);
})(angular);
