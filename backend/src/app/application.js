require('./config/config')();

const app = require('./server');
const http = require('http');
const mongoose = require('mongoose');

/**
 * Start Http-Server.
 */
const runHttpServer = () => {
    const server = http.createServer(app);
    const port = process.env.PORT;
    server.listen(port, () => {
        console.log('Server started successfully: Listen to port ' + process.env.PORT);
    });
    return server;
}

/**
 * Connect to database
 */
const connectToDb = async () => {
    const connectionString = `mongodb://${process.env.MONGO_SERVER}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}?directConnection=true`;
    return mongoose.connect(connectionString, {useNewUrlParser: true, authSource: "admin", user: process.env.MONGO_USER, pass: process.env.MONGO_PASSWORD});
}

const startApplication = async () => {
    try {
        await connectToDb();
        console.log("DB-Connection successfully established.");
        runHttpServer();
    } catch (e) {
        console.log(e);
    }
}

module.exports = startApplication;



