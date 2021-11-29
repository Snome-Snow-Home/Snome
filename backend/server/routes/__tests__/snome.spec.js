const setup = require('../../../jest/setup.js')
const teardown = require('../../../jest/teardown.js')

// use supertest to request server endpoints
// https://zellwk.com/blog/endpoint-testing/

/* SETUP AND TEARDOWN */

// jest open handles error: https://github.com/facebook/jest/issues/6907
let server;
let request;

beforeAll((done) => {
    
    [server, request] = setup(done);
});

afterAll((done) => {
    teardown(done, server);
});


// SNOME

describe('GET ALL RECORDS', () => {
      
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


describe('GET A SINGLE RECORD BY ID', () => {
      
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













