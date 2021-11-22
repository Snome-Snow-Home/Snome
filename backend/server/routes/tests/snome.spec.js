const app = require('../../index.js');
const supertest = require('supertest');
const http = require('http');
const db = require('../../../database')

// use supertest to request server endpoints
// https://zellwk.com/blog/endpoint-testing/

/* SETUP AND TEARDOWN */

// fix jest open handles error: https://github.com/facebook/jest/issues/6907
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

// SNOME

describe('GET ALL RECORDS endpoint', () => {
      
    it('return 200 response', (done) => {
        request
            .get('/snome')
            .expect(200)
            .end(done);
    });

    it('return json response', (done) => {
        request
            .get('/snome')
            .expect('Content-Type', /json/)
            .end(done);
    });

});


describe('GET SINGLE RECORD BY ID endpoint', () => {
      
    it('if record with provided id exists, return 200 response', (done) => {
        request
            .get('/snome/1')
            .expect(200)
            .end(done);
    });

    it('if record with provided id does not exist, return 404 response', (done) => {
        request
            .get('/snome/99999')
            .expect(404)
            .end(done);
    });

    it('return json response', (done) => {
        request
            .get('/snome')
            .expect('Content-Type', /json/)
            .end(done);
    });

});













