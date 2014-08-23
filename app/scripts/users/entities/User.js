(function (ng) {
    var $http = null,
        User = function ()
        {
            this.login = null;
            this.alias = null;
            this.email = null;
            this.superuser = false;
        };

    User.prototype.me = function ()
    {
        if (this.login === 'anonymous') {
            this.alias = 'anonymous';

            return;
        }

        var request = $http.post(
            '/api/UsersManager/getUser',
            {
                userLogin: this.login
            }
        ),
            that = this;

        request.then(function (response) {
            if (response.data.length === 1) {
                that.alias = response.data[0].alias;
                that.email = response.data[0].email;
                that.superuser = response.data[0].superuser_access === '1';
            }
        });
    };

    ng.module('piwik-external-dashboard.users').factory('User', [
        "$http",
        function (_$http)
        {
            $http = _$http;

            return User;
        }
    ]);
})(angular);
