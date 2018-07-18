const uuid = require('uuid')

module.exports = {
  // processing can return a Promise
  processRequest: (req, res) => {
    if (!req.headers['x-request-id']) req.headers['x-request-id'] = uuid.v4()

    return Promise.resolve()
  },

  // processing is synchronous
  processResponse: (proxyRes, req, res) => true
}
