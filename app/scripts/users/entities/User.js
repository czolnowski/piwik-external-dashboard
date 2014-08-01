(function (ng) {
    var User = function ()
    {
        this.login = null;
    },
        _$http = null;

    User.prototype.me = function ()
    {
        var request = _$http.post(
            '/api/UsersManager/getUser',
            {
                userLogin: this.login
            }
        );
        request.then(function (response) { console.log(response)});
    }

    ng.module('piwikExtDash.users').factory('User', [
        "$http",
        function ($http)
        {
            _$http = $http;

            return User;
        }
    ]);
})(angular);
