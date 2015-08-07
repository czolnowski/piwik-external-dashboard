'use strict';

describe('[Auth] Service: AuthFetcher', function () {
    beforeEach(module('ngRoute'));
    beforeEach(module('md5'));
    beforeEach(module('ngCookies'));

    beforeEach(function() {
        module(function($provide) {
            $provide.constant('REPORTS_SOURCE', {source: 'api'});
        });
    });

    beforeEach(module('piwik-external-dashboard.users'));
    beforeEach(module('piwik-external-dashboard.auth'));

    var AuthFetchers,
        AuthFetchersSecond,
        Fetchers;

    // Initialize the controller and a mock scope
    beforeEach(function () {
        Fetchers = function () {
            this.get = function () {};
        };

        module(function ($provide) {
            $provide.value('Fetchers', Fetchers);
        });

        inject(function ($injector) {
            AuthFetchers = $injector.get('AuthFetchers');
            AuthFetchersSecond = $injector.get('AuthFetchers');
        });
    });

    it('should create new Fetchers instance and return them, after second call should return same instance', function () {
        expect(AuthFetchers).toEqual(AuthFetchersSecond);
    });
});
