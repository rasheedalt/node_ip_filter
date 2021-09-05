const supertest = require('supertest');
const app = require('../src/server');
// app.enable('trust proxy');
const request = supertest(app);


describe('Call endpoint', () => {
    it('Should visit the unrestricted endpoint (/home)', () => {
        request.get('/home')
            .expect(200)
            .then((res) => {
                expect(res.body.success).toBeTruthy();
            })
    })

    it('Should not visit the restricted endpoint with a ip 192.7.8.1 (/protected-route)', async () => {
        let response = await request.get('/protected-route')
                                .set('Accept', 'application/json')
                                .set('Remote-Addr', '192.7.8.1')
                                .set('X-Forwarded-For', '192.7.8.1');
        // console.log(response.body)
        // expect(response.body.success).toBe(false);
        expect(response.status).toBe(401);
    })

    it('Should visit the restricted endpoint (/protected-route) with ip 127.0.0.1', async () => {
        let response = await request.get('/protected-route')
                    .set('Accept', 'application/json')
                    .set('Remote-Addr', '::ffff:127.0.0.1')
                    .set('X-Forwarded-For', '::ffff:127.0.0.1');

                    console.log(response.body)
        expect(response.body.success).toBe(true);

    })

});