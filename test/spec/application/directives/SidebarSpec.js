'use strict';

describe('[Application] Directive: Sidebar', function () {
    beforeEach(function () {
        module(function ($provide) {
            $provide.constant('REPORTS_SOURCE', {source: 'api'});
        });
    });
    beforeEach(module('piwik-external-dashboard.application'));

    var scope,
        element,
        template = '<div class="some-class"><div>sidebar</div></div>',
        templateId = 'views/application/sidebar.html';

    beforeEach(function () {
        inject(function ($rootScope, $compile, $templateCache) {
            $templateCache.put(templateId, template);
            scope = $rootScope.$new();
            element = $compile('<div application-sidebar active="false"></div>')(scope);
            scope.$digest();
        });
    });

    it('should replace element with proper template', function () {
        expect(element.get(0).outerHTML).toEqual(
            '<div application-sidebar="" active="false" class="ng-scope"><div class="some-class"><div>sidebar</div></div></div>'
        );
    });

    it('should set menu object in scope', function () {
        expect(scope.menu.show).toBeDefined();
        expect(scope.menu.sm).toBeDefined();
        expect(scope.menu.md).toBeDefined();
    });

    it('should set default menu values as false in scope', function () {
        expect(scope.menu.show).toBe(false);
        expect(scope.menu.sm.toggled).toBe(false);
        expect(scope.menu.md.toggled).toBe(false);
    });
});
