const express = require('express');
const path = require('path');
const fs = require('fs');
const {apiKeyMiddleware} = require("./middleware/auth");

const initRoutes = (app) => {
    console.log(`\n-----------------------------------\n`);
    console.log(`Start initialize routes\n`);

    getRoutesDynamically(app, `./../${process.env.DIR_GEN_ROUTES}`);
    getRoutesDynamically(app, `./../${process.env.DIR_EXT_ROUTES}`);

    console.log(`\nFinished initialize routes`);
    console.log(`\n-----------------------------------\n`);
}

const getRoutesDynamically = (app, relativePath) => {
    const directory = path.join(__dirname, relativePath);
    if (fs.existsSync(directory) === false) return;

    fs.readdirSync(directory).forEach(file => {
        if (path.extname(file) === '.js') {
            const router = require(`${relativePath}/${file}`);
            app.use('/', router);

            console.log(`Add router ${file}`);
        }else if(fs.lstatSync(directory + "/" + file).isDirectory() === true){
            getRoutesDynamically(app, relativePath + "/" + file)
        }
    });
};

const initServer = () => {
    const app = express();

    apiKeyMiddleware(app);

    app.use(express.json({
        limit: '10mb'
    }));
    app.use(express.urlencoded({extended: false}));

    //Init Routers (generated + custom)
    initRoutes(app);

    return app;
}

module.exports = initServer();
