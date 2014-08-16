(function (ng) {
    'use strict';

    var MetricsService = function (metricsColors, Metric)
    {
        this.metricsColors = metricsColors;
        this.Metric = Metric;
    };

    MetricsService.prototype.getEnabled = function (metrics)
    {
        return metrics.filter(
            function (metric)
            {
                return metric.enabled;
            }
        );
    };

    MetricsService.prototype.rebuild = function (metrics)
    {
        var enabledMetrics = this.getEnabled(metrics),
            that = this;

        ng.forEach(
            enabledMetrics,
            function (metric, index)
            {
                metric.color = that.metricsColors[index % that.metricsColors.length];
            }
        );
    };

    MetricsService.prototype.parseMetadata = function (metadata, ykeys, labels, metrics)
    {
        var that = this;

        ng.forEach(
            metadata.metrics,
            function (name, key)
            {
                ykeys.push(key);
                labels.push(name);
                metrics.push(new that.Metric(name, key, metadata.metricsDocumentation[key]));
            }
        );
    };

    MetricsService.prototype.confirmNumericValues = function (values, ykeys, labels, metrics, labelKey)
    {
        ng.forEach(
            values,
            function (value, metricKey)
            {
                if (!ng.isNumber(value) && metricKey !== labelKey) {
                    var index = ykeys.indexOf(metricKey);

                    if (index > -1) {
                        ykeys.splice(index, 1);
                        labels.splice(index, 1);
                        metrics.splice(index, 1);
                    }
                }
            }
        );
    };

    MetricsService.prototype.removeNonNumericValues = function (values, labelKey)
    {
        ng.forEach(
            values,
            function (value, key)
            {
                if (!ng.isNumber(value) && key !== labelKey) {
                    delete values[key];
                }
            }
        );
    };

    MetricsService.prototype.parseValues = function (data, ykeys, labels, metrics, labelKey, valuesCallback)
    {
        var confirmedNumericValues = false,
            result = [],
            that = this;

        ng.forEach(
            data,
            function (values, key)
            {
                if (!confirmedNumericValues) {
                    that.confirmNumericValues(values, ykeys, labels, metrics, labelKey);

                    confirmedNumericValues = true;
                }

                that.removeNonNumericValues(values, labelKey);

                if (ng.isFunction(valuesCallback)) {
                    valuesCallback(values, key);
                }

                result.push(values);
            }
        );

        return result;
    };

    ng.module('piwikExtDash.morris').service(
        'MetricsService',
        [
            "metricsColors", "Metric",
            MetricsService
        ]
    );
})(window.angular);
