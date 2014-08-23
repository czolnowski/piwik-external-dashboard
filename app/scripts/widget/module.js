(function (ng) {
    'use strict';

    ng.module('piwik-external-dashboard.widget', [], function ($provide) {
        $provide.value(
            'chartsColors', [
                {
                    // 113F8C
                    // 17/63/140
                    fillColor: 'rgba(17,63,140,0.2)',
                    strokeColor: 'rgba(17,63,140,1)',
                    pointColor: 'rgba(17,63,140,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(17,63,140,1)',
                    color: '#113F8C',
                    highlight: '#113F8C'
                },
                {
                    // 01A4A4
                    // 1/164/164
                    fillColor: 'rgba(1,164,164,0.2)',
                    strokeColor: 'rgba(1,164,164,1)',
                    pointColor: 'rgba(1,164,164,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(1,164,164,1)',
                    color: '#01A4A4',
                    highlight: '#01A4A4'
                },
                {
                    // 00A1CB
                    // 0/161/203
                    fillColor: 'rgba(0,161,203,0.2)',
                    strokeColor: 'rgba(0,161,203,1)',
                    pointColor: 'rgba(0,161,203,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(0,161,203,1)',
                    color: '#00A1CB',
                    highlight: '#00A1CB'
                },
                {
                    // 61AE24
                    // 97/174/36
                    fillColor: 'rgba(97,174,36,0.2)',
                    strokeColor: 'rgba(97,174,36,1)',
                    pointColor: 'rgba(97,174,36,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(97,174,36,1)',
                    color: '#61AE24',
                    highlight: '#61AE24'
                },
                {
                    // D0D102
                    // 208/209/2
                    fillColor: 'rgba(208,209,2,0.2)',
                    strokeColor: 'rgba(208,209,2,1)',
                    pointColor: 'rgba(208,209,2,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(208,209,2,1)',
                    color: '#D0D102',
                    highlight: '#D0D102'
                },
                {
                    // 32742C
                    // 50/116/44
                    fillColor: 'rgba(50,116,44,0.2)',
                    strokeColor: 'rgba(50,116,44,1)',
                    pointColor: 'rgba(50,116,44,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(50,116,44,1)',
                    color: '#32742C',
                    highlight: '#32742C'
                },
                {
                    // D70060
                    // 215/0/96
                    fillColor: 'rgba(215,0,96,0.2)',
                    strokeColor: 'rgba(215,0,96,1)',
                    pointColor: 'rgba(215,0,96,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(215,0,96,1)',
                    color: '#D70060',
                    highlight: '#D70060'
                }
            ]
        );
    });
})(angular);
