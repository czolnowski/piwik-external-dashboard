/*jslint node: true, unparam: true*/
"use strict";

var app = require('connect')(),
    apiRoute = require('./api/index'),
    configRoute = require('./config/index'),
    serveStatic = require('serve-static'),
    fs = require('fs'),
    http = require('http'),
    winston = require('winston'),
    log = new winston.Logger();

module.exports = function (serverConfig, frontendConfig) {
    if (typeof serverConfig.static !== 'string') {
        log.log('info', 'config.static set to "app".');
        serverConfig.static = 'app';
    }

    if (typeof serverConfig.port !== 'number') {
        log.log('info', 'config.port set to "3000".');
        serverConfig.port = 3000;
    }

    app.use(apiRoute.path, apiRoute.resolver(serverConfig, frontendConfig));
    app.use(configRoute.path, configRoute.resolver(serverConfig, frontendConfig));
    app.use(serveStatic(serverConfig.static, {}))

    app.use(function (request, response) {
        fs.readFile(serverConfig.static + '/index.html', "binary", function (err, file) {
            if (err) {
                response.writeHead(500, {"Content-Type": "text/plain"});
                response.write(err + "\n");
                response.end();

                return;
            }

            response.writeHead(200);
            response.write(file, "binary");
            response.end();
        });
    });

    http.createServer(app).listen(serverConfig.port);
    log.log('info', 'Server is running.');
};


