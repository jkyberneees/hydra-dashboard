const fastProxy = require('fast-proxy')

module.exports = (hydra, config, pipeline) => {
  const { proxy } = fastProxy(config.proxy || {})

  return async (req, res) => {
    try {
      await pipeline.processRequest(req, res)
      proxy(req, res, await hydra.http.proxy.translate(req, true) + req.url, {
        onResponse: pipeline.processResponse
      })
    } catch (err) {
      const msgparts = (err.message || '500:Internal Server Error').split(':', 2)
      if (msgparts.length > 1) {
        res.statusCode = parseInt(msgparts[0], 10)
        res.statusMessage = msgparts[1]
      } else {
        res.statusCode = 500
        res.statusMessage = msgparts[0]
      }

      res.end()
    }
  }
}
