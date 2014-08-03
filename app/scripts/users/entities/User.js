(function (ng) {
    var User = function ()
    {
        this.login = null;
        this.alias = null;
    },
        _$http = null;

    User.prototype.me = function ()
    {
        if (this.login === 'anonymous') {
            this.alias = 'anonymous';

            return;
        }

        var request = _$http.post(
            '/api/UsersManager/getUser',
            {
                userLogin: this.login
            }
        ),
            that = this;

        request.then(function (response) {
            that.alias = response[0].alias
        });
    };

    ng.module('piwikExtDash.users').factory('User', [
        "$http",
        function ($http)
        {
            _$http = $http;

            return User;
        }
    ]);
})(angular);
