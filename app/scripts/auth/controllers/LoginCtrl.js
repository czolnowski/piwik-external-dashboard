(function (ng) {
    'use strict';

    var LoginCtrl = function (authenticate)
    {
        this.authenticate = authenticate;

        this.host = "";
        this.login = "";
        this.password = "";
        this.anonymous = false;
        this.loading = false;
    };

    LoginCtrl.prototype.process = function ()
    {
        if (this.anonymous) {
            this.authenticate.asAnonymous(this.host);
        } else {
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
        }
    };

    LoginCtrl.prototype.isComplete = function ()
    {
        return this.host !== null && this.host.length > 0
            && (
                (this.login !== null && this.login.length > 0
                    && this.password !== null && this.password.length > 0)
                || this.anonymous === true
            );
    };

    ng.module('piwikExtDash.auth').controller("LoginCtrl", [
        "Authenticate",
        LoginCtrl
    ]);
})(angular);
