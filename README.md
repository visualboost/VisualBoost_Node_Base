# Introduction

*VisualBoost* allows you to speed up your development process by generating your backend with only one click.

### Project description:

This repository represents NodeJS express application that does not contain any routes.

### Prerequisites

- Docker version 20.10.7 or higher
- Docker Compose version 1.25.0 or higher
- Node version 16.13.0 or higher
- NPM version 8.5.5 or higher

### Project

The project is splited into two directories: **backend** and **db**. The **backend** directory contains the sourcecode
of your application. The **db** directory contains all necessary data to run your mongodb application locally.

```
root
└── backend
└── db
```

#### backend:

The backend directory should contain all your database models and express routes for your application.
Furthermore, it contains the environment variables that are necessary to run your application.

```
backend
└── configuration --> Add your .env file here
└── src
    └── app --> Contains all necessary logic to run your express app
    └── db --> Contains your mongodb models
    └── routes --> Contains your express routes
```

#### db:

The database directory contains all necessary files to run your mongodb service as a docker container.
The mongodb service will run as a single replicaset to allow the usage of transactions.

### Environment Variables:

Before you can run your application you have to add the environment variables to the following files:

1. The **environment file of your NodeJS** application: backend/configuration/.env
2. The **environment file for your mongodb** service: db/.env
3. The **environment file for your http file**s: http-client.env.json (the filename may change due to your IDE)

Reproduce the following steps for each environment file:

1. In your VisualBoost project, navigate to Settings.
2. Click the tab Configuration.
3. Click the eye icon on the top right corner to display the environment files.
4. Copy the environment variables into your project.

### Let's start the database

Before your application can run properly you need to start the mongodb container.
The mongodb instance should run as a replicaset to allow transactions. 
Therefore, you need to create a key file first.

#### Create key directory:

--- 

Create a file ``mongo_replica_key`` inside the directory ``./db/key``:

**Linux:**
```shell
mkdir -p db/key
touch mongo_replica_key
```

**Windows:**
```shell
mkdir -f .\db\key
echo "" > .\db\key\mongo_replica_key
```

You can also create this file manually.
After you created the file, you can insert your replica key.

#### Now start the database:

**Linux:**

```shell
docker-compose -f ./db/docker-compose.yml up
```

**Windows:**
```shell
docker-compose -f .\db\docker-compose.yml up
```

Congratulations! You are two steps away from running your application.

### Install dependencies:

Move to the directory **backend** and install all necessary dependencies:

**Linux:**

```shell
cd backend && npm install
```

**Windows:**
```shell
cd backend
npm install
```

## Start the application

Start your application:

**Linux:**
```shell
cd backend && npm run start
```

**Windows:**
```shell
cd backend
npm run start
```

or run your application in **development mode**:

**Linux:**
```shell
cd backend && npm run dev
```

**Windows:**
```shell
cd backend
npm run dev
```

This means that it'll be automatically restarted when you modify your project.

## Extensions


Your project contains a directory where you can create your custom routes.
By default it's ``/backend/routes/extension``.
The router files added to this directory will automatically added to express during application start.

#### Supported annotations:

| Type            | Description                                                               | Example                          |
|:----------------|---------------------------------------------------------------------------|:---------------------------------|
| **@name:**      | Define the function name                                                  | ```@name: thisIsMyFunction```    |
| **@body:**      | Define the body of the function. See section **Supported types**.         | ``@body: { my_string: string }`` |
| **@return:**    | Define the return value of the function. See section **Supported types**. | ``@return: { my_int: int }``     |

#### Supported types

| Type         | Example                                      |
|:-------------|:---------------------------------------------|
| **String**   | ```@body/@return: string```                  |
| **Boolean**  | ``@body/@return: boolean``                           |
| **Int**      | ``@body/@return: int``                               |
| **Float**    | ``@body/@return: float``                             |
| **Date**     | ``@body/@return: date``                              |
| **Location** | ``@body/@return: location``                          |
| **File**     | ``@body/@return: { type: file, volume: my_volume }`` |
| **Enum**     | ``@body/@return: EnumName(VALUE1, VALUE2)``          |
| **Object**   | ``@body/@return: { "my_string": string }``           |
| **Array**    | ``@body/@return: [string]``                          |

### Example:

```javascript
/**
 * This is the description section. You can describe yor function here.
 *
 * @name: your_function_name
 *
 * @body: string
 * @return: [{
 *     my_string: String,
 *     my_bool: boolean,
 *     my_file: file,
 *     my_dates: [date],
 *     my_nested_object: {
 *          my_int_array: [int]  
 *     }
 * }]
 **/
router.put("/my_route>", async (req, res, next) => {
    /** cour code **/
});

```

#### Dependencies:

Feel free to add new dependencies to the package.json file:

```json
{
  "dependencies": {
    "my_new_dependency": "1.0.0"
  }
}
```

#### .vbignore 

Use the file `.vbignore` if you want to prevent Visualboost from changing files during Build-Process.

<u>Example:</u>

You do not want that your backend can received plain text bodies. 
Do achieve your goal you might change the `initServer` function in the `server.js` file.
<br/>
<br/>

```javascript
const initServer = () => {
    const app = express();

    //load middlewares
    initMiddlewares(app);

    //set body parser (allow text/plain and application/json)
    //app.use(express.text({limit: '10mb'})); <-- delete this line
    app.use(express.json({limit: '10mb'}));

    app.use(express.urlencoded({extended: false}));

    //load routes (generated + custom)
    initRoutes(app);

    return app;
}
```
<br/>

VisualBoost would normally override the server.js file and your changes would be gone.
To avoid that, you can create a file in the project directory `.vbignore`.
Equal to `.gitignore` this file contains all file paths and directory paths that should be ignored:


| Ignore            | Example                                      |
|:------------------|:---------------------------------------------|
| **A single file** | ```backend/src/index.js```                  |
| **A directory**   | ``backend/src/app``                           |

_Note: that the paths need to be relative to the `.vbignore` file._

