module.exports = (hydra) => {
    return async(req, res) => {
        res.send(await hydra._getServiceHealth(req.params.service));
    };
}