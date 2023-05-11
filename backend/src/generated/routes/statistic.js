const router = require('express').Router();
const os = require('os');

router.get(
    '/system/info',
    async (req, res, next) => {

        const port = process.env.PORT;
        const freeMemory = os.freemem()
        const totalMemory = os.totalmem()

        const systemInfo = {
            freeMemory: freeMemory,
            totalMemory: totalMemory
        }

        const host = req.get('host');
        if (host.includes(":")) {
            const domainAndPort = host.split(":")
            systemInfo.host = domainAndPort[0];
            systemInfo.port = domainAndPort[1];
        }else{
            systemInfo.host = host;
            systemInfo.port = process.env.PORT;
        }

        res.json(systemInfo)


    }
);

module.exports = router;
