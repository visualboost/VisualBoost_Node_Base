require('./generated/config/config')();

const app = require('./server');
const http = require('http');
const mongoose = require('mongoose');
const {runEvents, EVENTS} = require('./generated/hooks/Hookhandler');

/**
 * Listen on provided port, on all network interfaces.
 */
const initHttpServer = () => {
    const server = http.createServer(app);
    const port = process.env.PORT || '3000';
    server.listen(port, () => {
        console.log('Server started successfully: Listening to port ' + process.env.PORT);
    });
    return server;
}

const connectToDb = async () => {
    const connectionString = `mongodb://${process.env.MONGO_SERVER}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}?directConnection=true`;
    return mongoose.connect(connectionString, {useNewUrlParser: true, authSource: "admin", user: process.env.MONGO_USER, pass: process.env.MONGO_PASSWORD});
}


const startApplication = async () => {
    try {
        await runEvents(app, EVENTS.BEFORE_START);

        await connectToDb();
        console.log("DB-Connection successfully established.");

        await runEvents(app, EVENTS.ON_START);
        initHttpServer();
    } catch (e) {
        console.log(e);
    }
}

module.exports = startApplication;



