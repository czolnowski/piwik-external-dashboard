/*jslint node: true */
"use strict";

var request = require('request')

var parseApiRequest = function (body, request, response) {
    var options = {
        url: request.url,
        method: 'get'
    };

    request(options, function (error, requestResponse, body) {
        if (error === null) {
            if (typeof body !== 'string') {
                body = JSON.stringify(body);
            }

            response.end(body);
        } else {
            response.end(JSON.stringify(
                {
                    'error': 'piwik_has_gone',
                    'error_description': 'Piwik not responding.'
                }
            ));
        }
    });
};

var parseApiPostRequest = function (request, callback) {
    var body = '';
    request.on('data', function (data) {
        body += data;

        if (body.length > 1e6) {
            request.connection.destroy();
        }
    });

    request.on('end', function () {
        callback(JSON.parse(body));
    });
};

var parseApiPostRequestProxy = function (request, response) {
    return function (body) {
        parseApiRequest(body, request, response);
    };
};

module.exports = {
    parseApiRequest: parseApiRequest,
    parseApiPostRequest: parseApiPostRequest,
    parseApiPostRequestProxy: parseApiPostRequestProxy
};
