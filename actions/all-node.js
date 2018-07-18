module.exports = hydra => async (req, res) => {
  res.send(await hydra.getServiceNodes())
}
