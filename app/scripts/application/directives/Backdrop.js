(function (ng) {
    'use strict';

    ng.module('piwik-external-dashboard.application').directive(
        'applicationBackdrop',
        [
            '$window', '$http',
            function ($window, $http)
            {
                return {
                    template: [
                        '<div class="overlay text-center" ng-show="numberOfActiveRequests > 0">',
                        '<i class="fa fa-spinner fa-spin fa-5x" ng-style=""{\"marginTop\": dimensionsForIcon().height}"></i>',
                        '<br />Waiting for {{ numberOfActiveRequests }} requests... ',
                        '</div>'
                    ].join(''),
                    scope: {},
                    replace: true,
                    link: function (scope, element)
                    {
                        var icon = element.find('i'),
                            w = angular.element($window);

                        scope.getWindowDimensions = function () {
                            return { 'h': w.height(), 'w': w.width() };
                        };
                        scope.$watch(scope.getWindowDimensions, function (newValue) {
                            scope.windowHeight = newValue.h;
                            scope.windowWidth = newValue.w;

                            scope.dimensionsForIcon = function () {
                                return {
                                    'height': ((newValue.h - icon.height()) / 2) + 'px',
                                    'width': ((newValue.w - icon.width()) / 2) + 'px'
                                };
                            };

                        }, true);

                        w.bind('resize', function () {
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
            }
        ]
    );
})(window.angular);
