module.exports = (hydra) => {
    return async(req, res) => {
        let srvs = await hydra.getServices();
        let tasks = [];
        for (let srv of srvs) {
            tasks.push((async() => srv.available = await hydra.hasServicePresence(srv.serviceName))());
            delete srv.registeredOn;
        }
        await Promise.all(tasks);

        res.send(srvs);
    };
}