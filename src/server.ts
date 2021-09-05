import express from 'express';
import {port}  from '../config/endpoint.config';
import {ips}  from '../config/allowed_ips';
import dotenv from 'dotenv';
import { IpFilter, IpDeniedError} from 'express-ipfilter';

const app = express();
dotenv.config();

const allowedIps: string[]|any  = ips;

console.log(ips)
console.log(port)
console.log(process.env.ALLOWED_IPS)

app.get('/home', (req, res) => {
    const ip = req.ip;

    res.json({
        // ip,
        success: true,
        message: 'Endpoint successfully called',
        data: []
    })
})

// Use ip filer middleware if routes are many or use the middleware directly in the route functions
// app.use( ipfilter(allowedIps, { mode: 'allow' }) )

app.get('/protected-route', IpFilter(allowedIps, { mode: 'allow' }), (req, res) => {
    const ip = req.ip;

    res.json({
        // ip,
        success: true,
        message: 'Endpoint successfully called',
        data: []
    })
})

// Handle error for blocked ips
app.use((err, req, res, next) => {
    const ip = req.ip;

    if (err instanceof IpDeniedError) {
      res.status(401)
    } else {
      res.status(err.status || 500)
    }

    res.json({
        ip,
        success: false,
        allowed: allowedIps,
        message: 'Your ip is not authorized for this resource',
        error: err
    })
  })

//  export default app;
module.exports = app;

  // app.listen(port, () => console.log(`app is started on port ${port}`))

