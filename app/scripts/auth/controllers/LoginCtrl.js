(function (ng) {
    'use strict';

    var Site,
        $location,
        LoginCtrl = function (authenticate, _Site, _$location)
        {
            this.authenticate = authenticate;

            this.host = "";
            this.login = "";
            this.password = "";
            this.anonymous = false;
            this.loading = false;
            this.noAccess = false;

            Site = _Site;
            $location = _$location;
        };

    LoginCtrl.prototype.process = function ()
    {
        var request,
            that = this;
        if (this.anonymous) {
            request = this.authenticate.asAnonymous(this.host);
        } else {
            request = this.authenticate.login(
                this.host,
                this.login,
                this.password
            );
        }

        this.loading = true;

        request.then(
            function ()
            {
                Site.fetchAllWithAtLeastViewAccess().then(
                    function (response)
                    {
                        if (ng.isArray(response.data)) {
                            if (response.data.length > 0) {
                                $location.path("/" + response.data[0].idsite);
                            } else {
                                that.noAccess = true;
                            }
                        }
                    }
                );
            }
        );

        request['finally'](function () {
            that.loading = false;
        });
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

    ng.module('piwik-external-dashboard.auth').controller("LoginCtrl", [
        "Authenticate", "Site", "$location",
        LoginCtrl
    ]);
})(angular);
