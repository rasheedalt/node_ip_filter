"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.base_url = exports.enviroment = void 0;
exports.enviroment = (_a = process.env.ENVIROMENT) !== null && _a !== void 0 ? _a : '';
exports.base_url = (_b = process.env.BASE_URL) !== null && _b !== void 0 ? _b : '';
exports.port = (_c = process.env.PORT) !== null && _c !== void 0 ? _c : '5000';
// export const whitelistedIps: string[] |any  =  process.env.ALLOWED_IPS; //The whitelisted ips can also be an imported array
// export const whitelistedIps: string[]  = ['::ffff:127.0.0.1']; //The whitelisted ips can also be an imported array
