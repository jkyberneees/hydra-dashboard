module.exports = (hydra) => {
    return async(req, res) => {
        res.send(await hydra._getRoutes(req.params.service));
    };
}