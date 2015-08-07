'use strict';

describe('[Application] Directive: Container', function () {
    beforeEach(function () {
        module(function ($provide) {
            $provide.constant('REPORTS_SOURCE', {source: 'api'});
        });
    });
    beforeEach(module('piwik-external-dashboard.application'));

    var scope,
        element,
        template = '<div class="some-class"><div ng-transclude></div></div>',
        templateId = 'views/application/container.html';

    beforeEach(function () {
        inject(function ($rootScope, $compile, $templateCache) {
            $templateCache.put(templateId, template);
            scope = $rootScope.$new();
            element = $compile('<div application-container><div>should stay</div><div>this one too</div></div>')(scope);
            scope.$digest();
        });
    });

    it('should replace element with proper template', function () {
        expect(element.get(0).outerHTML).toEqual(
            '<div class="some-class" application-container=""><div ng-transclude=""><div class="ng-scope">should stay</div><div class="ng-scope">this one too</div></div></div>'
        );
    });

    it('should set states object in scope', function () {
        expect(scope.states.sm).toBeDefined();
        expect(scope.states.md).toBeDefined();
    });

    it('should set default states values as false in scope', function () {
        expect(scope.states.sm.toggled).toBe(false);
        expect(scope.states.md.toggled).toBe(false);
    });
});
