/*jslint node: true */
"use strict";

var dashboard = require('./application/dashboard'),
    config;

process.argv.forEach(function (val) {
    if (val.indexOf('--config=') === 0) {
        try {
            config = require(val.substr('--config='.length));
        } catch (e) {
            console.log('Invalid path to config: ' + val.substr('--config='.length));
        }
    }
});

dashboard(
    (config && config.server) ? config.server : {},
    (config && config.frontend) ? config.frontend : {}
);


