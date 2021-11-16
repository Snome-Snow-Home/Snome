const app = require('../index.js');  // express app instance 
const supertest = require('supertest');

// use supertest to request server endpoints
// https://zellwk.com/blog/endpoint-testing/
const request = supertest(app);  

describe('/snome endpoint', () => {
    
})

it('GET /snome endpoint', async done => {
    const response = await request.get('/snome');

    expect(response.status).toBe(200);
    // expect(response.getHeader('Content-Type')).toBe('/json/');
    done();
})