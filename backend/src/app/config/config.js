module.exports = (configPath) => {
    const dotenv = require('dotenv');
    const envFile = configPath || process.cwd() + '/configuration/.env';
    dotenv.config({ path: envFile });
}

