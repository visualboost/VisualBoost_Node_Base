const express = require('express');
const path = require('path');
const fs = require('fs');

/**
 * Loads and initializes all routers
 */
const initRoutes = (app) => {
    console.log(`\nStep 2`);
    console.log(`-----------------------------------\n`);
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

/**
 * Loads and initializes all middlewares from directory src/app/middleware
 */
const initMiddlewares = (app, relativePath = './middleware') => {
    console.log(`\nStep 1`);
    console.log(`-----------------------------------\n`);
    console.log(`Start initialize middlewares\n`);

    const directory = path.join(__dirname, './middleware');
    if (fs.existsSync(directory) === false) return;

    fs.readdirSync(directory).forEach(file => {
        if (path.extname(file) === '.js') {
            const middleware = require(`${relativePath}/${file}`);
            app.use(middleware);

            console.log(`Add middleware ${file}`);
        } else if (fs.lstatSync(directory + "/" + file).isDirectory() === true) {
            getRoutesDynamically(app, relativePath + "/" + file)
        }
    });

    console.log(`\nFinished initialize middlewares`);
    console.log(`\n-----------------------------------\n`);
};

const initServer = () => {
    const app = express();

    //load middlewares
    initMiddlewares(app);

    //set body parser (allow text/plain and application/json)
    app.use(express.text({limit: '10mb'}));
    app.use(express.json({limit: '10mb'}));

    app.use(express.urlencoded({extended: false}));

    //load routes (generated + custom)
    initRoutes(app);

    return app;
}
module.exports = initServer();
