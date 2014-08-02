(function (ng) {
    var Report = function ()
    {
        this.report = null;
    },

    _$http = null;

    Report.prototype.fetch = function (idSite, apiModule, apiAction)
    {
        var request = _$http.post(
            '/api/API/getProcessedReport',
            {
                apiModule: apiModule,
                apiAction: apiAction,
                idSite: idSite,
                period: 'day',
                date: 'yesterday'
            }
        ),
        that = this;
        request.then(function (response) {
            var index;
            for (index in response.data) {
                if (response.data.hasOwnProperty(index)) {
                    that[index] = response.data[index];
                }
            }
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
