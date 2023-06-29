module.exports.apiKeyMiddleware = (app) => {
    app.use((req, res, next) => {
        const apiKey = req.get("x-api-key");
        if (apiKey !== process.env.API_KEY) {
            res.status(403).send({error: {code: 403, message: "Forbidden"}});
        }

        next();
    })
};
