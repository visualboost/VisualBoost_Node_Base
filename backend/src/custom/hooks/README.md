# Events

Hooks are a tool to customize you backend. Therefore you can just add your code under here. Currently the following
events are supported.

- beforeStart
- onStart

## Example: Adding custom middleware

1. Create a folder under **events** named **onStart**.
2. Add new *.js file.
3. Add the following code to the file.

````javascript
const addMyCustomMiddleware = (app) => {
    app.use('/', myCustomMiddleware)
    console.log("Custom middleware added")
}

const myCustomMiddleware = (req, res, next) => {
    /*
     * Your code...
     */ 
}

module.exports = addMyCustomMiddleware;
