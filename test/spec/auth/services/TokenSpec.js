'use strict';

describe('[Auth] Service: Token', function () {
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

    var Token,
        fetcher,
        md5,
        $cookieStore;

    beforeEach(function () {
        fetcher = {
            getTokenAuth: function () {}
        };
        spyOn(fetcher, 'getTokenAuth').and.stub();

        var AuthFetchers = {
            get: function () {
                return fetcher;
            }
        };

        md5 = {
            createHash: function () {}
        };
        spyOn(md5, 'createHash').and.stub();

        $cookieStore = {
            put: function () {},
            get: function () {}
        };
        spyOn($cookieStore, 'put').and.stub();

        module(function ($provide) {
            $provide.value('AuthFetchers', AuthFetchers);
            $provide.value('md5', md5);
            $provide.value('$cookieStore', $cookieStore);
        });

        inject(function ($injector) {
            Token = $injector.get('Token');
        });
    });

    afterEach(function () {
        md5.createHash.calls.reset();
    });

    it('should run getTokenAuth from fetcher once when using get', function () {
        Token.get('host', 'login', 'password');

        expect(md5.createHash.calls.count()).toEqual(1);
    });

    it('should parse argument using md5 function when using get', function () {
        Token.get('host', 'login', 'password');

        expect(fetcher.getTokenAuth.calls.count()).toEqual(1);
    });

    it('should return false as isValid result when tokenAuth is null', function () {
        expect(Token.isValid()).toBe(false);
    });

    it('should return false as isValid result when tokenAuth is not null, but host is null', function () {
        Token.tokenAuth = 'test';

        expect(Token.isValid()).toBe(false);
    });

    it('should return true as isValid result when tokenAuth and host are not null', function () {
        Token.tokenAuth = 'test';
        Token.host = 'demo.piwik.org';

        expect(Token.isValid()).toBe(true);
    });

    it('should call once $cookieStore method put when token is persisting', function () {
        Token.persist();

        expect($cookieStore.put.calls.count()).toEqual(1);
    });

    it('should call once $cookieStore method get when token is restoring', function () {
        spyOn($cookieStore, 'get').and.stub();
        $cookieStore.get.calls.reset();
        Token.restore();

        expect($cookieStore.get.calls.count()).toEqual(1);
    });

    it('should set proper parameters after restore', function () {
        spyOn($cookieStore, 'get').and.returnValue({
            tokenAuth: 'tokenAuthFake',
            login: 'loginFake',
            host: 'host.fake.com'
        });

        Token.restore();

        expect(Token.tokenAuth).toBe('tokenAuthFake');
        expect(Token.login).toBe('loginFake');
        expect(Token.host).toBe('host.fake.com');
    });
});
