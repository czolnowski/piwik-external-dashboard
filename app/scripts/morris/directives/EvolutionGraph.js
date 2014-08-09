(function (ng) {
    'use strict';

    ng.module('piwikExtDash.morris').directive(
        'evolutionGraph',
        [
            function ()
            {
                return {
                    require: '^singleWidget',
                    restrict: 'AE',
                    templateUrl: 'views/morris/evolution.html',
//                    controller: 'EvolutionGraphCtrl',
//                    controllerAs: 'evolution',
                    link: function($scope, elem, attrs, ctrl) {
                        console.log(ctrl);
                    }
                };
            }
        ]
    );
})(window.angular);
