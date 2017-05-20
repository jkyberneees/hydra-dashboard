const HydraServiceFactory = require('hydra-integration').HydraServiceFactory;
const config = require('config');

const factory = new HydraServiceFactory(config.service);
factory.init().then(factory => factory.getService(service => {
    let prefix = config.service.routePrefix;

    service.get(`${prefix}/srv`, require('./actions/all-srv')(factory.getHydra()));
    //service.get(`${config.routePrefix}/srv/:service/details`, require('./actions/srv-details')(hydra));
    //service.get(`${config.routePrefix}/srv/:service/routes`, require('./actions/srv-routes')(hydra));
    //service.get(`${config.routePrefix}/srv/:service/nodes`, require('./actions/srv-nodes')(hydra));
    //service.get(`${config.routePrefix}/srv/:service/status`, require('./actions/srv-status')(hydra));
}));



// supporting tests coverage
if (process.env.NODE_ENV === 'testing') {
    require('./tests')(factory, describe, it);
}