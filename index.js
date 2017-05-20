const HydraServiceFactory = require('hydra-integration').HydraServiceFactory;
const config = require('config');
const service = require('restana')();


service.use((req, res, next) => {
    let token = req.headers['authorization'] || '';
    if (!token.endsWith(config.service.accessToken || '')) {
        res.statusCode = 403;
        res.statusMessage = 'Forbidden';
    }

    next();
});
service.start(5000);

const factory = new HydraServiceFactory(config.service);
factory.init().then(factory => {
    let prefix = config.service.routePrefix;
    service.get(`${prefix}/srv`, require('./actions/all-srv')(factory.getHydra()));
    service.get(`${prefix}/srv/:service/routes`, require('./actions/srv-routes')(factory.getHydra()));
    service.get(`${prefix}/srv/:service/nodes`, require('./actions/srv-nodes')(factory.getHydra()));

    factory.sync(service);
});



// supporting tests coverage
if (process.env.NODE_ENV === 'testing') {
    require('./tests')(factory, describe, it);
}