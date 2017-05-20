module.exports = (factory, describe, it) => {
    const expect = require("chai").expect;
    const request = require('supertest')('http://localhost:5000/hdashboard');

    describe('Hydra Cluster Dashboard', () => {
        it('init', (done) => {
            factory.on('service:ready', () => {
                done();
            });
        });

        it('get all services', async() => {
            await request.get('/srv').expect(200)
                .then(response => {
                    let srv = response.body.filter((e) => e.serviceName === "hydra-dashboard")[0];
                    expect(srv.available).to.equal(true);
                });
        });
    });
}