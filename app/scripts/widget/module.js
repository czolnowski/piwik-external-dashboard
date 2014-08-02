(function (ng) {
    'use strict';

    ng.module('piwikExtDash.widget', [], function ($provide) {
        $provide.value(
            'chartsColors', [
                {
                    // #56baec
                    fillColor: "rgba(86,186,236,0.2)",
                    strokeColor: "rgba(86,186,236,1)",
                    pointColor: "rgba(86,186,236,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(86,186,236,1)",
                    color: "#56baec",
                    highlight: "#56baec"
                },
                {
                    // 216BC0
                    fillColor: "rgba(33,107,192,0.2)",
                    strokeColor: "rgba(33,107,192,1)",
                    pointColor: "rgba(33,107,192,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(33,107,192,1)",
                    color: "#216BC0",
                    highlight: "#216BC0"
                },
                {
                    // 184E8C
                    fillColor: "rgba(24,78,140,0.2)",
                    strokeColor: "rgba(24,78,140,1)",
                    pointColor: "rgba(24,78,140,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(24,78,140,1)",
                    color: "#184E8C",
                    highlight: "#184E8C"
                },
                {
                    // 15447A
                    fillColor: "rgba(21,68,122,0.2)",
                    strokeColor: "rgba(21,68,122,1)",
                    pointColor: "rgba(21,68,122,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(21,68,122,1)",
                    color: "#15447A",
                    highlight: "#15447A"
                },
                {
                    // 123A69
                    fillColor: "rgba(18,58,105,0.2)",
                    strokeColor: "rgba(18,58,105,1)",
                    pointColor: "rgba(18,58,105,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(18,58,105,1)",
                    color: "#123A69",
                    highlight: "#123A69"
                },
                {
                    // 0F3157
                    fillColor: "rgba(15,49,87,0.2)",
                    strokeColor: "rgba(15,49,87,1)",
                    pointColor: "rgba(15,49,87,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(15,49,87,1)",
                    color: "#0F3157",
                    highlight: "#0F3157"
                }
            ]
        );
    });
})(angular);
