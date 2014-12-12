/*jslint node: true */
"use strict";

var fs = require('fs');

var resolver = function (serverConfig, frontendConfig) {
    return function (request, response) {
        var name = request.url.substring(1, request.url.lastIndexOf('.'));
        if (typeof frontendConfig[name] !== 'undefined') {
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify(frontendConfig[name]));
        } else {
            response.statusCode = 404;
            response.end('Not found');
        }
    };
};

module.exports = {
    path: '/config',
    resolver: resolver
};
