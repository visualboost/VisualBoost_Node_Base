const path = require('path');
const fs = require('fs');

const customRootDir = 'custom';

const eventsDir = 'hooks';

const isPromise = (promise) => {
    return !!promise && (typeof promise.then === 'function' || promise.constructor.name == 'AsyncFunction')
}

const runFunction = async (app, event) => {
    if(isPromise(event)){
        await event(app);
        return true
    }else if (typeof event === 'function') {
        event(app);
        return true;
    }
    return false
}

const runFunctionsInDirectory = async (app, directory, event) => {
    if (fs.existsSync(directory) === false) return;

    for (let file of fs.readdirSync(directory)) {
        if (path.extname(file) === '.js') {
            const relativePath = path.relative(__dirname, directory)
            const eventFun = require(`./${relativePath}/${file}`);
            const executed = await runFunction(app, eventFun);

            if(executed === true){
                console.log(`Event: ${event}, Executed File: ${file}`);
            }
        }
    }
};

const runEvents = async (app, event) => {
    console.log(`\n-----------------------------------\n`);
    console.log(`Run events\n`);


    const basePath = path.join(__dirname, "..", "..");
    const generatedDir = path.join(basePath, process.env.DIR_ROOT, eventsDir, event);
    const customDir = path.join(basePath, customRootDir, eventsDir, event);

    await runFunctionsInDirectory(app, generatedDir, event)
    await runFunctionsInDirectory(app, customDir, event)

    console.log(`\nFinished events`);
    console.log(`\n-----------------------------------\n`);
};

module.exports.runEvents = runEvents;

const EVENTS = {
    ON_START: 'onStart',
    BEFORE_START: 'beforeStart'
}

module.exports.EVENTS = EVENTS;
