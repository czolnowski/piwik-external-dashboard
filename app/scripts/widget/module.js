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
                    pointHighlightStroke: "rgba(86,186,236,1)"
                },
                {
                    // 216BC0
                    fillColor: "rgba(33,107,192,0.2)",
                    strokeColor: "rgba(33,107,192,1)",
                    pointColor: "rgba(33,107,192,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(33,107,192,1)"
                },
                {
                    // 184E8C
                    fillColor: "rgba(24,78,140,0.2)",
                    strokeColor: "rgba(24,78,140,1)",
                    pointColor: "rgba(24,78,140,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(24,78,140,1)"
                },
                {
                    // 15447A
                    fillColor: "rgba(21,68,122,0.2)",
                    strokeColor: "rgba(21,68,122,1)",
                    pointColor: "rgba(21,68,122,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(21,68,122,1)"
                },
                {
                    // 123A69
                    fillColor: "rgba(18,58,105,0.2)",
                    strokeColor: "rgba(18,58,105,1)",
                    pointColor: "rgba(18,58,105,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(18,58,105,1)"
                },
                {
                    // 0F3157
                    fillColor: "rgba(15,49,87,0.2)",
                    strokeColor: "rgba(15,49,87,1)",
                    pointColor: "rgba(15,49,87,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(15,49,87,1)"
                }
            ]
        );
    });
})(angular);
