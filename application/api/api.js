/*jslint node: true */
"use strict";

var bodyRequests = ['post', 'delete', 'put', 'patch'],
    isStreamableMethod = function (method) {
        return bodyRequests.indexOf(method) > -1;
    },
    parser = require('./parser');

var route = function (request, response) {
    if (isStreamableMethod(request.method.toLowerCase())) {
        parser.parseApiPostRequest(
            request,
            parser.parseApiPostRequestProxy(request, response)
        );
    } else {
        parser.parseApiRequest(
            {},
            request,
            response
        );
    }
};

module.exports = route;
