/* eslint no-underscore-dangle:0 */

module.exports = hydra => async (req, res) => {
  res.send(await hydra._getServiceHealth(req.params.service));
};
