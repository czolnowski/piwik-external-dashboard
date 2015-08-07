'use strict';

describe('[Auth] Service: Authenticate', function () {
    beforeEach(module('ngRoute'));
    //beforeEach(module('angular-md5'));
    //beforeEach(module('ngCookies'));

    beforeEach(function() {
        module(function($provide) {
            $provide.constant('REPORTS_SOURCE', {source: 'api'});
        });
    });

    beforeEach(module('piwik-external-dashboard.users'));
    beforeEach(module('piwik-external-dashboard.auth'));

    var Authenticate,
        Token,
        User,
        $q,
        deferred;

    beforeEach(function () {
        Token = {
            get: function () {},
            persist: function () {},
            isValid: function () {},
            restore: function () {}
        };

        User = function () {
            this.me = function () {};
        };

        deferred = {
            resolve: function () {},
            promise: true
        };

        $q = {
            defer: function () {
                return deferred;
            }
        };

        module(function ($provide) {
            $provide.value('Token', Token);
            $provide.value('User', User);
            $provide.value('$q', $q);
        });

        inject(function ($injector) {
            Authenticate = $injector.get('Authenticate');
        });
    });

    it('should run Token.get on login', function () {
        spyOn(Token, 'get').and.returnValue(
            {
                then: function () {}
            }
        );

        Authenticate.login('host', 'login', 'password');

        expect(Token.get.calls.count()).toEqual(1);
    });

    it('should not run Token.persist on login when response is empty object', function () {
        spyOn(Token, 'get').and.returnValue(
            {
                then: function (callback) {
                    callback({data: {}});
                }
            }
        );
        spyOn(Token, 'persist').and.stub();

        Authenticate.login('host', 'login', 'password');

        expect(Token.persist.calls.count()).toEqual(0);
    });

    it('should run Token.persist on login when response has proper values', function () {
        spyOn(Token, 'get').and.returnValue(
            {
                then: function (callback) {
                    callback({data: {
                        value: 'result'
                    }});
                }
            }
        );
        spyOn(Token, 'persist').and.stub();
        spyOn(Authenticate, 'getUserInformation').and.stub();

        Authenticate.login('host', 'login', 'password');

        expect(Token.persist.calls.count()).toEqual(1);
    });

    it('should run Authenticate.getUserInformation on login when response has proper values', function () {
        spyOn(Token, 'get').and.returnValue(
            {
                then: function (callback) {
                    callback({data: {
                        value: 'result'
                    }});
                }
            }
        );
        spyOn(Token, 'persist').and.stub();
        spyOn(Authenticate, 'getUserInformation').and.stub();

        Authenticate.login('host', 'login', 'password');

        expect(Authenticate.getUserInformation.calls.count()).toEqual(1);
    });

    it('should resolve deferred with parameter "anonymous" on call asAnonymous', function () {
        spyOn(deferred, 'resolve').and.stub();

        Authenticate.asAnonymous('host');

        expect(deferred.resolve.calls.count()).toEqual(1);
        expect(deferred.resolve.calls.argsFor(0)).toEqual(['anonymous']);
    });

    it('should set parameters to Token', function () {
        Authenticate.asAnonymous('host');

        expect(Token.tokenAuth).toEqual('anonymous');
        expect(Token.host).toEqual('host');
        expect(Token.login).toEqual('anonymous');
    });

    it('should call getUserInformation with parameter "anonymous" on call asAnonymous', function () {
        spyOn(Authenticate, 'getUserInformation').and.stub();

        Authenticate.asAnonymous('host');

        expect(Authenticate.getUserInformation.calls.argsFor(0)).toEqual(['anonymous']);
    });

    it('should call Token.persist on call asAnonymous', function () {
        spyOn(Token, 'persist').and.stub();

        Authenticate.asAnonymous('host');

        expect(Token.persist.calls.count()).toEqual(1);
    });

    it('should return same value as Token.isValid on call isAuthenticated', function () {
        var isValidResult = false;
        spyOn(Token, 'isValid').and.callFake(function () {
            return isValidResult;
        });

        expect(Authenticate.isAuthenticated()).toBe(false);

        isValidResult = true;
        expect(Authenticate.isAuthenticated()).toBe(true);
    });

    it('should return /login when call getLoginPath', function () {
        expect(Authenticate.getLoginPath()).toEqual('/login');
    });

    it('should set login equal to parameter to object User on call getUserInformation', function () {
        spyOn(Authenticate.me, 'me').and.stub();

        Authenticate.getUserInformation('login');

        expect(Authenticate.me.login).toEqual('login');
    });

    it('should call me on object User when call getUserInformation', function () {
        spyOn(Authenticate.me, 'me').and.stub();

        Authenticate.getUserInformation('login');

        expect(Authenticate.me.me.calls.count()).toEqual(1);
    });
});
