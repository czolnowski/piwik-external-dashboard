/*jslint node: true */
'use strict';

var httpRequest = require('request');

var parseApiRequest = function (body, request, response) {
    var options = {method: 'get'},
        host = body.host,
        urlParams = body;

    delete urlParams.host;

    if (host && host.substr(0, 'http://'.length) !== 'http://' && host.substr(0, 'https://'.length) !== 'https://') {
        host = 'http://' + host;
    }

    /*jshint camelcase: false */
    if (typeof urlParams.token_auth !== 'string' || urlParams.token_auth.length !== 32) {
        urlParams.token_auth = 'anonymous';
    }
    /*jshint camelcase: true */

    if (typeof urlParams.module !== 'string') {
        urlParams.module = 'API';
    }

    if (typeof urlParams.method !== 'string') {
        urlParams.method = request.url.substr(1).split('/').join('.');
    }

    urlParams.format = 'json';

    options.url = [];
    Object.keys(urlParams).map(function (key) {
        options.url.push([key, urlParams[key]].join('='));
    });

    options.url = host + '/?' + options.url.join('&');

    httpRequest(options, function (error, requestResponse, body) {
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
