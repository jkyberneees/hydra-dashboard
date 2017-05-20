const HydraServiceFactory = require('hydra-integration').HydraServiceFactory;
const config = require('config');

const factory = new HydraServiceFactory(config.service);
factory.init().then(factory => factory.getService(service => {
    let prefix = config.service.routePrefix;

    service.use((req, res, next) => {
        let token = req.headers['authorization'] || '';
        if (!token.endsWith(config.service.accessToken || '')) {
            res.statusCode = 403;
            res.statusMessage = 'Forbidden';
        }

        next();
    });
    service.get(`${prefix}/srv`, require('./actions/all-srv')(factory.getHydra()));
    service.get(`${prefix}/srv/:service/routes`, require('./actions/srv-routes')(factory.getHydra()));
    service.get(`${prefix}/srv/:service/nodes`, require('./actions/srv-nodes')(factory.getHydra()));
}));



// supporting tests coverage
if (process.env.NODE_ENV === 'testing') {
    require('./tests')(factory, describe, it);
}