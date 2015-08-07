'use strict';

describe('[Application] Directive: BrandLogo', function () {
    beforeEach(function() {
        module(function($provide) {
            $provide.constant('REPORTS_SOURCE', {source: 'api'});
        });
    });
    beforeEach(module('piwik-external-dashboard.application'));

    var scope,
        element,
        ApplicationFetchers,
        template = '<div>test</div>',
        templateId = 'views/application/brand-logo.html';

    beforeEach(function () {
        ApplicationFetchers = {
            get: function () {
                return {
                    getVersion: function () {
                        return {
                            then: function () {}
                        };
                    },
                    getLogo: function () {
                        return {
                            then: function () {}
                        };
                    }
                };
            }
        };
        module(function ($provide) {
            $provide.value('ApplicationFetchers', ApplicationFetchers);
            $provide.constant('PIWIK_CHANGELOG_URL', 'changelog/piwik');
        });

        inject(function ($rootScope, $compile, $templateCache) {
            $templateCache.put(templateId, template);

            scope = $rootScope.$new();

            element = $compile('<div application-brand-logo id="should-not-be-replaced">should be replaced</div>')(scope);
        });
    });

    it('should replace element with proper template', function () {
        scope.$digest();

        expect(element.get(0).outerHTML).toEqual('<div application-brand-logo="" id="should-not-be-replaced">test</div>');
    });

    it ('should not set logo url into scope when logo fetcher return invalid value', function () {
        spyOn(ApplicationFetchers, 'get').and.returnValue({
            getLogo: function () {
                return {
                    then: function (callback) {
                        callback({});
                    }
                };
            },
            getVersion: function () {
                return {
                    then: function () {}
                };
            }
        });

        scope.$digest();

        expect(scope.logoUrl).not.toBeDefined();
    });

    it ('should set logo url into scope when logo fetcher return proper value', function () {
        spyOn(ApplicationFetchers, 'get').and.returnValue({
            getLogo: function () {
                return {
                    then: function (callback) {
                        callback({
                            data: {
                                value: 'logo.jpg'
                            }
                        });
                    }
                };
            },
            getVersion: function () {
                return {
                    then: function () {}
                };
            }
        });

        scope.$digest();

        expect(scope.logoUrl).toEqual('logo.jpg');
    });

    it ('should not set version and changelog url into scope when version fetcher return invalid value', function () {
        spyOn(ApplicationFetchers, 'get').and.returnValue({
            getLogo: function () {
                return {then: function () {}};
            },
            getVersion: function () {
                return {
                    then: function (callback) {
                        callback({});
                    }
                };
            }
        });

        scope.$digest();

        expect(scope.version).not.toBeDefined();
        expect(scope.changeLogUrl).not.toBeDefined();
    });

    it ('should set version and changelog url into scope when version fetcher return proper value', function () {
        spyOn(ApplicationFetchers, 'get').and.returnValue({
            getLogo: function () {
                return {then: function () {}};
            },
            getVersion: function () {
                return {
                    then: function (callback) {
                        callback({
                            data: {
                                value: '1.10'
                            }
                        });
                    }
                };
            }
        });

        scope.$digest();

        expect(scope.version).toEqual('v1.10');
        expect(scope.changeLogUrl).toEqual('changelog/piwik-1-10/');
    });
});

