(function (ng) {
    'use strict';

    var LoginCtrl = function (authenticate)
    {
        this.authenticate = authenticate;

        this.host = "";
        this.login = "";
        this.password = "";
        this.loading = false;
    };

    LoginCtrl.prototype.process = function ()
    {
        var request = this.authenticate.login(
            this.host,
            this.login,
            this.password
        ),
        that = this;

        this.loading = true;

        request['finally'](function () {
            that.loading = false;
        });
    };

    ng.module('piwikExtDash.auth').controller("LoginCtrl", [
        "Authenticate",
        LoginCtrl
    ]);
})(angular);
