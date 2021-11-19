const app = require('../../index.js');
const supertest = require('supertest');
const http = require('http');
const db = require('../../../database')

// use supertest to request server endpoints
// https://zellwk.com/blog/endpoint-testing/

describe('GET /snome endpoint', () => {
    // fix jest open handles error
    // https://github.com/facebook/jest/issues/6907
    let server;
    let request;
    

    beforeAll((done) => {
        // start app on random port
        server = http.createServer(app);
        server.listen(done);
        request = supertest(server);
    });

    afterAll((done) => {
        // close server and db connections before exiting test runner
        server.close(done);
        db.$pool.end();
    });
    
    it('returns 200 response', (done) => {
        request
            .get('/snome')
            .expect(200)
            .end(done);
    })

    it('returns json response', (done) => {
        request
            .get('/snome')
            .expect('Content-Type', /json/)
            .end(done);
    })

});













