/* eslint global-require:0, no-undef:0, no-console:0 */

const HydraIntegrationPlugin = require('hydra-integration').HydraIntegrationPlugin;
const HydraHttpPlugin = require('hydra-plugin-http').HydraHttpPlugin;
const config = require('config');
const hydra = require('hydra');
const service = require('restana')();

hydra.use(new HydraIntegrationPlugin());
hydra.use(new HydraHttpPlugin());

service.use((req, res, next) => {
  const token = req.headers.authorization || '';
  if (!token.endsWith(config.service.accessToken || '')) {
    res.statusCode = 403;
    res.statusMessage = 'Forbidden';
  }

  next();
});

const prefix = config.service.routesPrefix;
service.get('/_health', require('./actions/health')(hydra));
service.get(`${prefix}/srvs`, require('./actions/all-srv')(hydra));
service.get(`${prefix}/srvs/:service/routes`, require('./actions/srv-routes')(hydra));
service.get(`${prefix}/srvs/:service/health`, require('./actions/srv-health')(hydra));
service.get(`${prefix}/nodes`, require('./actions/all-node')(hydra));

const proxy = require('./actions/proxy-router')(hydra, config);

service.get('/*', proxy);
service.post('/*', proxy);
service.delete('/*', proxy);
service.options('/*', proxy);
service.head('/*', proxy);
service.patch('/*', proxy);
service.put('/*', proxy);

(async () => {
  await service.start(config.service.hydra.servicePort);
  await hydra.init(config.service);
  await hydra.registerService();
  await hydra.integration.sync(service);
})().catch(console.error);

// supporting tests coverage
if (process.env.NODE_ENV === 'testing') {
  require('./tests')(hydra, describe, it);
}
