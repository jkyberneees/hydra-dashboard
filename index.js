const HydraIntegrationPlugin = require('hydra-integration').HydraIntegrationPlugin;
const HydraHttpPlugin = require('hydra-plugin-http').HydraHttpPlugin;
const config = require('config');
const hydra = require('hydra');

hydra.use(new HydraIntegrationPlugin());
hydra.use(new HydraHttpPlugin());

const service = require('restana')();
service.use((req, res, next) => {
    let token = req.headers['authorization'] || '';
    if (!token.endsWith(config.service.accessToken || '')) {
        res.statusCode = 403;
        res.statusMessage = 'Forbidden';
    }

    next();
});
let prefix = config.service.routesPrefix;
service.get(`/_health`, require('./actions/health')(hydra));
service.get(`${prefix}/srv`, require('./actions/all-srv')(hydra));
service.get(`${prefix}/srv/:service/routes`, require('./actions/srv-routes')(hydra));
service.get(`${prefix}/srv/:service/health`, require('./actions/srv-health')(hydra));
service.get(`${prefix}/node`, require('./actions/all-node')(hydra));
service.get(`/*`, require('./actions/proxy-router')(hydra, config));
service.start(5000);

(async() => {
    await hydra.init(config.service);
    await hydra.registerService();
    await hydra.integration.sync(service);
})();



// supporting tests coverage
if (process.env.NODE_ENV === 'testing') {
    require('./tests')(hydra, describe, it);
}