module.exports = (hydra, describe, it) => {
    const expect = require("chai").expect;
    const request = require('supertest')('http://localhost:5000');

    describe('Hydra Cluster Dashboard', () => {
        it('init', function (done) {
            this.timeout(6000);

            setTimeout(() => {
                done();
            }, 5000);
        });

        it('get all services', async() => {
            await request.get('/srvs').expect(200)
                .then(response => {
                    let srv = response.body.filter((e) => e.serviceName === "hydra-dashboard")[0];
                    expect(srv.available).to.equal(true);
                });
        });

        it('get service routes', async() => {
            await request.get('/srvs/hydra-dashboard/routes').expect(200)
                .then(response => {
                    expect(response.body.includes('[GET]/srvs/:service/routes')).to.equal(true);
                });
        });

        it('get service health', (done) => {
            request.get('/srvs/hydra-dashboard/health').expect(200)
                .then(response => {
                    expect(response.body.length > 0).to.equal(true);
                    done();
                });
        });

        it('get nodes', (done) => {
            request.get('/nodes').expect(200)
                .then(response => {
                    expect(response.body.length > 0).to.equal(true);
                    done();
                });
        });
    });
}