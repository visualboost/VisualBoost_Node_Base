
# Introduction
Welcome to Appfield. This repository contains the generated Backend by Appfield.
You can test and modify the code as you want.

## Prerequisites

- Docker version 20.10.7 or higher
- Docker Compose version 1.25.0 or higher
- Node version 16.13.0 or higher
- NPM version 8.5.5 or higher

## Project

This section describes the project stucture. The root directory contains a README.md and two directories that contains
the nodejs project and the docker file for the database..

```
root
│    README.md
└─── backend
└─── db
```

The **backend directory** is divided in two sections. A **generated** and a **custom** section.

The **generated** directory will be recreated for each created version. Therefor **do not change** anything inside this directory.

**TODO: finish description**

```
backend
│   ...
│
└───src
    └───custom
    └───generated
        |
        └───config
        └───data
        └───db
        └───hooks
        └───openapi
        └───routes
        └───util
```

## Start Database
Before your Backend can run properly you need to start the MongoDB.

### Create key file

---

#### Step by step
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

#### Or all together:
If you are used to that, just run the following command to create a key file:

```shell
mkdir -p db/key &&
cd db/key &&
openssl rand -base64 756 > mongo_replica_key &&
chmod 400 mongo_replica_key &&
sudo chown 999 mongo_replica_key
```

### Start the database
Navigate to the directory **db** and start the database in a docker container:
```shell
cd db && docker-compose up
```

## Install dependencies
Move to the directory **backend** and install all necessary dependencies:
```shell
cd backend && npm install
```

## Start the application
Now start your application:

```shell
cd backend && npm run start
```

or run your application in **development mode**:
```shell
cd backend && npm run dev
```

This means that it'll be automatically restarted when you modify your project.

# Customization

## Dependencies

To add new dependencies, just add the to the package.json.

### Sample:

    {
      "dependencies": {
        "my_new_dependency": "1.0.0"
      }
    }

## Add Environment Files
TODO: Describe how to add the environment file
