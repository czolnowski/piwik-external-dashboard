(function () {
    'use strict';

    var User = function ()
        {
            this.login = null;
            this.alias = null;
            this.email = null;
            this.superuser = false;
        };

    User.prototype.me = function ()
    {
        var that = this;

        if (this.login === 'anonymous') {
            this.alias = 'anonymous';

            return;
        }

        User.fetcher.getUser(this.login).then(function (response) {
            if (response.data.length === 1) {
                that.alias = response.data[0].alias;
                that.email = response.data[0].email;
                /*jshint camelcase: false */
                that.superuser = response.data[0].superuser_access === '1';
                /*jshint camelcase: true */
            }
        });
    };

    User.prototype.isValid = function ()
    {
        return this.login !== null || this.alias !== null || this.email !== null;
    };

    angular.module('piwik-external-dashboard.users').factory('User', [
        'UserFetchers',
        function (UserFetchers)
        {
            User.fetcher = UserFetchers.get();

            return User;
        }
    ]);
})();
