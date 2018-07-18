module.exports = hydra => async (req, res) => {
  const srvs = await hydra.getServices()
  const tasks = []
  srvs.forEach((srv) => {
    tasks.push((async () => (srv.available = await hydra.hasServicePresence(srv.serviceName)))())
    delete srv.registeredOn
  })
  await Promise.all(tasks)

  res.send(srvs)
}
