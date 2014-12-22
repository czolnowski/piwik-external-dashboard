'use strict';

describe('[Auth] Controller: LoginCtrl', function () {

    // load the controller's module
    beforeEach(module('ngRoute'));
    beforeEach(module('md5'));
    beforeEach(module('ngCookies'));
    beforeEach(module('piwik-external-dashboard.users'));
    beforeEach(module('piwik-external-dashboard.auth'));


    var LoginCtrl,
        authenticate,
        site,
        $location;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller) {
        authenticate = {
            asAnonymous: function () {},
            login: function () {}
        };

        site = {};

        $location = {
            path: function () {}
        };

        LoginCtrl = $controller('LoginCtrl', {
            Authenticate: authenticate,
            Site: site,
            $location: $location
        });


    }));

    it('should return false if host is equal to null', function () {
        expect(LoginCtrl.isValidHost()).toBe(false);
    });

    it('should return false if host is empty', function () {
        LoginCtrl.host = '';

        expect(LoginCtrl.isValidHost()).toBe(false);
    });

    it('should return true if host is set', function () {
        LoginCtrl.host = 'http://demo.piwik.org';

        expect(LoginCtrl.isValidHost()).toBe(true);
    });

    it('should return false if login is equal to null', function () {
        expect(LoginCtrl.isValidLogin()).toBe(false);
    });

    it('should return false if login is empty', function () {
        LoginCtrl.login = '';

        expect(LoginCtrl.isValidLogin()).toBe(false);
    });

    it('should return true if login is set', function () {
        LoginCtrl.login = 'test';

        expect(LoginCtrl.isValidLogin()).toBe(true);
    });

    it('should return false if password is equal to null', function () {
        expect(LoginCtrl.isValidPassword()).toBe(false);
    });

    it('should return false if password is empty', function () {
        LoginCtrl.password = '';

        expect(LoginCtrl.isValidPassword()).toBe(false);
    });

    it('should return true if password is set', function () {
        LoginCtrl.password = 'test';

        expect(LoginCtrl.isValidPassword()).toBe(true);
    });

    it('should return true if user is anonymous', function () {
        LoginCtrl.anonymous = true;

        expect(LoginCtrl.isValidUser()).toBe(true);
    });

    it('should return false if user is not anonymous and login and password are invalid', function () {
        LoginCtrl.anonymous = false;

        spyOn(LoginCtrl, 'isValidLogin').and.returnValue(false);
        spyOn(LoginCtrl, 'isValidPassword').and.returnValue(false);

        expect(LoginCtrl.isValidUser()).toBe(false);
    });

    it('should return true if user is not anonymous and login and password are valid', function () {
        LoginCtrl.anonymous = false;

        spyOn(LoginCtrl, 'isValidLogin').and.returnValue(true);
        spyOn(LoginCtrl, 'isValidPassword').and.returnValue(true);

        expect(LoginCtrl.isValidUser()).toBe(true);
    });

    it('should validate as incomplete when host is valid and user is invalid', function () {
        spyOn(LoginCtrl, 'isValidHost').and.returnValue(true);
        spyOn(LoginCtrl, 'isValidUser').and.returnValue(false);

        expect(LoginCtrl.isComplete()).toBe(false);
    });

    it('should validate as complete when host and user are valid', function () {
        spyOn(LoginCtrl, 'isValidHost').and.returnValue(true);
        spyOn(LoginCtrl, 'isValidUser').and.returnValue(true);

        expect(LoginCtrl.isComplete()).toBe(true);
    });

    it('should process anonymous user', function () {
        LoginCtrl.anonymous = true;

        spyOn(authenticate, 'asAnonymous').and.returnValue({
            then: function () {},
            'finally': function () {}
        });
        LoginCtrl.process();

        expect(authenticate.asAnonymous.calls.count()).toBe(1);
    });

    it('should log in user', function () {
        LoginCtrl.anonymous = false;

        spyOn(authenticate, 'login').and.returnValue({
            then: function () {},
            'finally': function () {}
        });
        LoginCtrl.process();

        expect(authenticate.login.calls.count()).toBe(1);
    });

    it('should change loading flag in process method using finally callback', function () {
        LoginCtrl.anonymous = true;

        var callback = function () {},
            request = {
                then: function () {},
                'finally': function (_callback) {
                    callback = _callback;
                }
            };

        spyOn(authenticate, 'asAnonymous').and.returnValue(request);
        LoginCtrl.process();

        expect(LoginCtrl.loading).toBe(true);

        callback();
        expect(LoginCtrl.loading).toBe(false);
    });

    it('redirectIfThereIsAnySiteOrMarkAsNoAccess should set access flag to false if there is empty array as parameter', function () {
        LoginCtrl.redirectIfThereIsAnySiteOrMarkAsNoAccess(
            {
                data: []
            }
        );

        expect(LoginCtrl.noAccess).toBe(true);
    });

    it('redirectIfThereIsAnySiteOrMarkAsNoAccess should set use $location.path with first element', function () {
        spyOn($location, 'path').and.stub();

        LoginCtrl.redirectIfThereIsAnySiteOrMarkAsNoAccess(
            {
                data: [
                    {
                        idsite: 10
                    },
                    {
                        idsite: 99
                    }
                ]
            }
        );

        expect($location.path.calls.count()).toBe(1);
        expect($location.path.calls.argsFor(0)).toEqual(['/10']);
    });
});
