(function (ng) {
    'use strict';

    ng.module('piwikExtDash.evolution').directive(
        'evolutionGraph',
        [
            function ()
            {
                return {
                    require: '^report',
                    restrict: 'AE',
                    templateUrl: 'views/evolution/graph.html',
                    controller: 'EvolutionGraphCtrl',
                    controllerAs: 'evolution',
                    link: function($scope, elem, attrs, ctrl) {
                        console.log(ctrl);
                    }
                };
            }
        ]
    );
})(window.angular);
