/**
 * @name limitFromTo
 * @by Sven Anders Robbestad, 2013
 * @license CC0 1.0 Universal (CC0 1.0)
 * @description
 * Limit From-To filter for AngularJS.
 * Creates a new array or string containing only a specified number of elements with an extra
 * parameter specifying the starting point..
 * The elements are taken from either the beginning or the end of the source array or string, as
 * specified by the value and sign (positive or negative) of `limit`.
 *
 * Usage:
 * <div ng-repeat="data in array|limitFromTo:2:8"></div>
 * Returns a copy of the array with the remaining elements from the selected position. In the example above, the div will be populated with 6 elements from position 2.
 *
 */
angular.module('piwikExtDash.tables').filter('limitFromTo', function() {
    return function(input, offset, limit) {
        if(!(input instanceof Array) && !(input instanceof String)) return input;

        limit = parseInt(limit,10);

        if (input instanceof String) {
            if (limit) {
                return limit >= 0 ? input.slice(offset, limit) : input.slice(limit, input.length);
            } else {
                return "";
            }
        }

        var out = [],
            i, n;

        if (limit > input.length)
            limit = input.length;
        else if (limit < -input.length)
            limit = -input.length;

        if (limit > 0) {
            i = offset;
            n = limit;
        } else {
            i = input.length + limit;
            n = input.length;
        }

        for (; i<n; i++) {
            out.push(input[i]);
        }

        return out;
    };
});
