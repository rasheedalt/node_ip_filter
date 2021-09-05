"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = require('./src/server');
var endpoint_config_1 = require("./config/endpoint.config");
app.listen(endpoint_config_1.port, function () { return console.log("app is started on port " + endpoint_config_1.port); });
