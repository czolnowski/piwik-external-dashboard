(function (ng) {
    var Report = function ()
    {
        this.report = null;
    },
        _$http = null;

    Report.prototype.fetch = function (apiModule, apiAction)
    {
        var request = _$http.post(
            '/api/API/getProcessedReport',
            {
                apiModule: apiModule,
                apiAction: apiAction
            }
        ),
            that = this;
        request.then(function (response) {
            that.report = response;
        });
    };

    ng.module('piwikExtDash.widget').factory('Report', [
        "$http",
        function ($http)
        {
            _$http = $http;

            return Report;
        }
    ]);
})(angular);
