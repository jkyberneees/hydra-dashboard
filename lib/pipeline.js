/* eslint no-unused-vars:0, import/no-extraneous-dependencies: 0 */

const uuid = require('uuid');

module.exports = {
  // processing can return a Promise
  processRequest: (req, res) => {
    if (!req.headers['x-request-id']) res.setHeader('x-request-id', uuid.v4());

    return Promise.resolve();
  },

  // processing is synchronous
  processResponse: (proxyRes, req, res) => true,
};
