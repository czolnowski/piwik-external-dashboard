/*jslint node: true, unparam: true*/
"use strict";

var app = require('connect')(),
    api = require('./api/api'),
    serveStatic = require('serve-static'),
    fs = require('fs'),
    http = require('http'),
    winston = require('winston'),
    log = new winston.Logger();

module.exports = function (config) {
    if (typeof config.static !== 'string') {
        log.log('info', 'config.static set to "app".');
        config.static = 'app';
    }

    if (typeof config.port !== 'number') {
        log.log('info', 'config.port set to "3000".');
        config.port = 3000;
    }

    app.use('/api', api);
    app.use(serveStatic(config.static, {}))

    app.use(function (request, response) {
        fs.readFile(config.static + '/index.html', "binary", function (err, file) {
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

    http.createServer(app).listen(config.port);
    log.log('info', 'Server is running.');
};


