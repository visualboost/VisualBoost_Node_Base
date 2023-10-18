module.exports = (configPath) => {
    const dotenv = require('dotenv');
    const envFile = configPath || process.cwd() + '/.env';
    dotenv.config({ path: envFile });
}

