'use strict';

describe('[Auth] Service: TokenInterceptor', function () {
    beforeEach(module('ngRoute'));
    beforeEach(module('angular-md5'));
    beforeEach(module('ngCookies'));

    beforeEach(function() {
        module(function($provide) {
            $provide.constant('REPORTS_SOURCE', {source: 'api'});
        });
    });

    beforeEach(module('piwik-external-dashboard.users'));
    beforeEach(module('piwik-external-dashboard.auth'));

    var TokenInterceptor,
        Token,
        $rootScope,
        config;

    beforeEach(function () {
        Token = {
            restore: function () {},
            isValid: function () {}
        };

        config = {};

        $rootScope = {
            $on: function () {},
            $watch: function () {},
            $emit: function () {}
        };

        module(function ($provide) {
            $provide.value('Token', Token);
            $provide.value('$rootScope', $rootScope);
        });

        inject(function ($injector) {
            TokenInterceptor = $injector.get('TokenInterceptor');
        });
    });

    it('should run $emit of $rootScope once when request is intercepting', function () {
        spyOn($rootScope, '$emit');
        TokenInterceptor.request(config);

        expect($rootScope.$emit.calls.count()).toEqual(1);
    });

    it('should run $emit of $rootScope with proper parameters when request is intercepting', function () {
        spyOn($rootScope, '$emit');
        TokenInterceptor.request(config);

        expect($rootScope.$emit.calls.argsFor(0)).toEqual(['auth.token', config, Token]);
    });
});
