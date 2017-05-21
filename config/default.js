module.exports = {
    service: {
        hydra: {
            'serviceName': process.env.SERVICE_NAME || 'hydra-dashboard',
            'serviceDescription': 'Hydra cluster dashboard application.',
            'serviceIP': '127.0.0.1',
            'servicePort': 5000,
            'serviceType': 'restana',
            'serviceVersion': '1.0.0',
            'redis': {
                'url': process.env.REDIS_URL || 'redis://localhost:6379/15'
            }
        },
        accessToken: '',
        routesPrefix: ''
    }
}