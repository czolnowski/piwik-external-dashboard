(function () {
    'use strict';

    var module = angular.module('piwik-external-dashboard.application');

    module.directive('applicationBackdrop', function (ApplicationWindow, $http) {
        return {
            template: [
                '<div class="overlay text-center" ng-show="numberOfActiveRequests > 0">',
                '<i class="fa fa-spinner fa-spin fa-5x" ng-style="{\'marginTop\': dimensionsForIcon().height}"></i>',
                '<br />Waiting for {{ numberOfActiveRequests }} requests... ',
                '</div>'
            ].join(''),
            scope: false,
            replace: true,
            link: function (scope, element)
            {
                var icon = element.find('i');

                scope.getWindowDimensions = function () {
                    return ApplicationWindow.getDimensions();
                };

                scope.$watch(scope.getWindowDimensions, function (newValue) {
                    scope.windowHeight = newValue.h;
                    scope.windowWidth = newValue.w;

                    scope.dimensionsForIcon = function (_icon) {
                        if (!_icon) {
                            _icon = icon;
                        }

                        return {
                            height: ((scope.windowHeight - _icon.height()) / 2) + 'px',
                            width: ((scope.windowWidth - _icon.width()) / 2) + 'px'
                        };
                    };

                }, true);

                ApplicationWindow.onResize(function () {
                    scope.$apply();
                });

                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.numberOfActiveRequests = $http.pendingRequests.length;
                scope.$watch(scope.isLoading, function ()
                {
                    scope.numberOfActiveRequests = $http.pendingRequests.length;
                });
            }
        };
    });
})();
