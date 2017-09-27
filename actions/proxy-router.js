/* eslint import/no-extraneous-dependencies: 0 */

const httpProxy = require('http-proxy');

module.exports = (hydra, config, pipeline) => {
  const proxy = httpProxy.createProxyServer(config.proxy || {});
  proxy.on('proxyRes', (proxyRes, req, res) => {
    pipeline.processResponse(proxyRes, req, res);
  });

  return async (req, res) => {
    try {
      await pipeline.processRequest(req, res);
      proxy.web(req, res, {
        target: await hydra.http.proxy.translate(req, true),
      });
    } catch (err) {
      const msgparts = (err.message || '500:Internal Server Error').split(':', 2);
      if (msgparts.length > 1) {
        res.statusCode = parseInt(msgparts[0], 10);
        res.statusMessage = msgparts[1];
      } else {
        res.statusCode = 500;
        res.statusMessage = msgparts[0];
      }

      res.end();
    }
  };
};
