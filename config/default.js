const SERVICE_NAME = process.env.SERVICE_NAME || 'hydra-dashboard';

module.exports = {
  service: {
    hydra: {
      serviceName: SERVICE_NAME,
      serviceDescription: 'Hydra cluster dashboard application.',
      serviceIP: 'localhost',
      servicePort: 5000,
      serviceType: 'restana',
      serviceVersion: '1.0.0',
      redis: {
        url: process.env.REDIS_URL || 'redis://localhost:6379/15',
      },
      plugins: {
        'hydra-plugin-http': {
          lb: {
            strategy: {
              name: 'race', // available strategies: race, last-presence
              timeout: 3000,
              nodes: 3,
              healthPath: '_health',
            },
          },
          proxy: {
            routesCache: SERVICE_NAME === 'hydra-router', // routes caching only supported if service name is 'hydra-router'
          },
        },
      },
    },
    accessToken: '',
    routesPrefix: '',
  },
};
