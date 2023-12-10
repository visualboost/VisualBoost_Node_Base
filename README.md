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
Furthermore it contains the environment variables that are necessary to run your application.

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
To run the mongodb instance as a replicaset, you need to create a key file first. You can do this **step by step** or **
all at once**.

#### Step by step:

--- 
Create a new key file. This file is used by mongodb to transfer data between the replica sets securely</br>
(**This step is only necessary if you did not already created a key file**):

Create directory ./db/key

```shell
mkdir -p db/key
```

Create a new key file for mongodb

```shell
openssl rand -base64 756 > ./db/key/mongo_replica_key
```

Set permission - only owner is allowed to read the key file

```shell
chmod 400 ./db/key/mongo_replica_key
```

Set keyfile owner so docker can read it.

```shell
sudo chown 999 ./db/key/mongo_replica_key
```

#### All at once:

If you are used to that, just run the following command to create a key file:

```shell
mkdir -p db/key &&
cd db/key &&
openssl rand -base64 756 > mongo_replica_key &&
chmod 400 mongo_replica_key &&
sudo chown 999 mongo_replica_key
```

#### Now start the database:

Navigate to the directory **db** and start your database:

```shell
cd db && docker-compose up
```

Congratulations! You are two steps away from running your application.

### Install dependencies:

Move to the directory **backend** and install all necessary dependencies:

```shell
cd backend && npm install
```

## Start the application

Start your application:

```shell
cd backend && npm run start
```

or run your application in **development mode**:

```shell
cd backend && npm run dev
```

This means that it'll be automatically restarted when you modify your project.

## Extensions

### Custom functionality

#### Extend routes

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



#### Custom functions:

You can add additionally files inside the project wherever you want (expect the generation directories).
Please keep in mind, that the generation directories for routes and 
database models (default: ``/routes/generated``, ``/db/generated``) will be regenerated during commit.


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

