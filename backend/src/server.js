const express = require('express');
const path = require('path');
const fs = require('fs');

const generatedRootDir = 'generated';
const customRootDir = 'custom';

const routesDir = 'routes';

const initRoutes = (app) => {
    console.log(`\n-----------------------------------\n`);
    console.log(`Starting Router-Initialisation\n`);

    getRequirementsDynamically(app, `./${generatedRootDir}/${routesDir}`);
    getRequirementsDynamically(app, `./${customRootDir}/${routesDir}`);

    console.log(`\nFinished Router-Initialisation`);
    console.log(`\n-----------------------------------\n`);
}

const getRequirementsDynamically = (app, relativePath) => {
    const directory = path.join(__dirname, relativePath);
    if (fs.existsSync(directory) === false) return;

    fs.readdirSync(directory).forEach(file => {
        if (path.extname(file) === '.js') {
            const router = require(`${relativePath}/${file}`);
            app.use('/', router);

            console.log(`Add router ${file}`);
        }else if(fs.lstatSync(directory + "/" + file).isDirectory() === true){
            getRequirementsDynamically(app, relativePath + "/" + file)
        }
    });
};


const checkIfFileExists = (relativePath) => {
    const directory = path.join(__dirname, relativePath);
    return fs.existsSync(directory);
}

const initServer = () => {
    const app = express();
    app.use(express.json({
        limit: '10mb'
    }));
    app.use(express.urlencoded({extended: false}));

    //Init Routers (generated + custom)
    initRoutes(app);

    return app;
}

module.exports = initServer();