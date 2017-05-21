const uuid = require('uuid');

module.exports = (hydra, config) => {
    const proxy = require('http-proxy').createProxyServer(config.proxy || {});
    proxy.on('proxyReq', function (proxyReq, req, res, options) {
        if (!proxyReq.getHeader('x-request-id'))
            proxyReq.setHeader('X-Request-ID', uuid.v4());
    });

    return async(req, res) => {
        try {
            proxy.web(req, res, {
                target: await hydra.http.proxy.translate(req, true)
            });
        } catch (err) {
            let msgparts = (err.message || '500:Internal Server Error').split(':', 2);
            if (msgparts.length > 1) {
                res.statusCode = parseInt(msgparts[0]);
                res.statusMessage = msgparts[1];
            } else {
                res.statusCode = 500;
                res.statusMessage = msgparts[0];
            }

            res.end();
        }
    };
}