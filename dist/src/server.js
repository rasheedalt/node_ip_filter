"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var endpoint_config_1 = require("../config/endpoint.config");
var allowed_ips_1 = require("../config/allowed_ips");
var dotenv_1 = __importDefault(require("dotenv"));
var express_ipfilter_1 = require("express-ipfilter");
var app = (0, express_1.default)();
dotenv_1.default.config();
var allowedIps = allowed_ips_1.ips; // Allow the following IPs
// const allowedIps = ['::ffff:127.0.0.1'];
console.log(allowed_ips_1.ips);
console.log(endpoint_config_1.port);
console.log(process.env.ALLOWED_IPS);
app.get('/home', function (req, res) {
    var ip = req.ip;
    res.json({
        // ip,
        success: true,
        message: 'Endpoint successfully called',
        data: []
    });
});
// Use ip filer middleware if routes are many or use the middleware directly in the route functions
// app.use( ipfilter(allowedIps, { mode: 'allow' }) )
app.get('/protected-route', (0, express_ipfilter_1.IpFilter)(allowedIps, { mode: 'allow' }), function (req, res) {
    var ip = req.ip;
    res.json({
        // ip,
        success: true,
        message: 'Endpoint successfully called',
        data: []
    });
});
// Handle error for blocked ips
app.use(function (err, req, res, next) {
    var ip = req.ip;
    if (err instanceof express_ipfilter_1.IpDeniedError) {
        res.status(401);
    }
    else {
        res.status(err.status || 500);
    }
    res.json({
        ip: ip,
        success: false,
        allowed: allowedIps,
        message: 'Your ip is not authorized for this resource',
        error: err
    });
});
//  export default app;
module.exports = app;
// app.listen(port, () => console.log(`app is started on port ${port}`))
