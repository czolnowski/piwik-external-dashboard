'use strict';

describe('[Application] Directive: Backdrop', function () {
    beforeEach(function() {
        module(function($provide) {
            $provide.constant('REPORTS_SOURCE', {source: 'api'});
        });
    });
    beforeEach(module('piwik-external-dashboard.application'));

    var scope,
        element,
        ApplicationWindow,
        $http;

    beforeEach(function () {
        ApplicationWindow = {
            getDimensions: function () {
                return {h: 600, w: 800};
            },
            onResize: function () {}
        };

        $http = {
            pendingRequests: []
        };

        module(function ($provide) {
            $provide.value('ApplicationWindow', ApplicationWindow);
            $provide.value('$http', $http);
        });

        inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();

            element = $compile('<div application-backdrop></div>')(scope);
            scope.$digest();
        });
    });

    it('should replace element with proper template', function () {
        var template = '<div class="overlay text-center ng-binding ng-scope ng-hide" ng-show="numberOfActiveRequests &gt; 0" application-backdrop="">' +
            '<i class="fa fa-spinner fa-spin fa-5x" ng-style="{\'marginTop\': dimensionsForIcon().height}" style="margin-top: 300px; "></i>' +
            '<br>Waiting for 0 requests... </div>';

        expect(element.get(0).outerHTML).toEqual(template);
    });

    it('should pass to scope ApplicationWindow.getDimensions result', function () {
        expect(scope.getWindowDimensions()).toEqual(ApplicationWindow.getDimensions());
    });

    it('should change scope dimensions when window dimensions has changes', function () {
        ApplicationWindow.getDimensions = function () {
            return {h: 1000, w: 820};
        };
        scope.$apply();

        expect(scope.windowHeight).toEqual(1000);
        expect(scope.windowWidth).toEqual(820);
    });

    it('should return dimensions for icon based on scope height and width', function () {
        ApplicationWindow.getDimensions = function () {
            return {h: 1010, w: 810};
        };
        scope.$apply();

        expect(scope.dimensionsForIcon({
            height: function () {return 10;},
            width: function () {return 10;}
        })).toEqual({
            height: '500px',
            width: '400px'
        });
    });

    describe(' when pending requests array has changed and is not empty', function () {
        beforeEach(function () {
            $http.pendingRequests = [true, true, true];
            scope.$apply();
        });
        it('should return true', function () {
            expect(scope.isLoading()).toBe(true);
        });

        it('should change number of active requests', function () {
            expect(scope.numberOfActiveRequests).toBe(3);
        });

        it('should change template', function () {
            var template = '<div class="overlay text-center ng-binding ng-scope" ng-show="numberOfActiveRequests &gt; 0" application-backdrop="">' +
                '<i class="fa fa-spinner fa-spin fa-5x" ng-style="{\'marginTop\': dimensionsForIcon().height}" style="margin-top: 300px; "></i>' +
                '<br>Waiting for 3 requests... </div>';

            expect(element.get(0).outerHTML).toEqual(template);
        });
    });
});

