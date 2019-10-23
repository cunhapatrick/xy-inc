# BoilerPlate Javascript API Nodejs

## Description

Simple API REST nodejs server with authentication system and CRUD to server a product entity

## [Repository URL](https://cunhapatrick.github.io/xy-inc)

## Initial env Settings

run `yarn` to install all dependencies
run `yarn appSecretGenerate keyword` , copy the hash inside .env variable APP_SECRET

## Database Configuration (MongoDB)

- Follow one of those instructions
  1. [MongoDB](https://www.mongodb.com/download-center/community)
  - Follow the instructions to download and install on your local machine
  - run `mongo` on terminal to iniciate mongo shell
  - run on mongo shell `use database_name`
  - `db.create({user: "username",pwd:"userpassword",roles:"readWrite",db:"databasename"})`, remember to change the `username`,`pwd` and `db` values
  - Now set the credential values of the mongodb inside src/config/env/.env
  2. [Docker](https://hub.docker.com/)
  - Create a account and follow the instructions to download the docker cli to your local machine
  - After the download and install follow those [instructions](https://hub.docker.com/_/mongo/)
  - Create a database and it's user
  - Now set the credentials inside src/config/env/.env
  3. [Mlab](https://mlab.com/home)
  - Create a account
  - Create a database and a database user
  - set the credentials inside src/config/env/.env
  4. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  - Create a account
  - Create a database and a database user
  - set the credentials inside src/config/env/.env

## Redis Configuration

- Follow one of those instructions

1. [Docker](https://hub.docker.com/)

- Follow those [instruction](https://hub.docker.com/_/redis/)
- Set the credentials to .env file

2. [Redis Server](https://redis.io/download)

- Download and configure redis to your local machine
- Set the .env file with the credentials (Obs: The .env.example already have the default credentials)

## Exception Error Config

To production error monitoring, I used (Sentry)[https://sentry.io], create a account and create a project, after that get the credentials data and put inside .env respective variables

## Init Server

run `yarn start` and start hacking !!!

## How to work with this server

- Use a REST client like Postman or Insomnia
- Create User on endpoint `/users` with the body parameters `{ name, email, password }` and POST method
- Create a Session on endpoint `/sessions` with the body parameters `{ email, password }` and POST method, copy the return token to the header with Bearer token authentication and paste the token on the token field

### Product CRUD

To access the next endpoints, it's necessary to create a session and put the generate token inside the header with bearer token autentication

- Create Product `/products` with body `{ name, description, qtd }` and POST method
- Update Product `/products/:id` with body `{ name, description, qtd }` and PUT method
- DELETE Product `/products/:id` and DELETE method
- List all Products  `/products` and GET method
- Get one Product by id `/products/:id` and GET method

Obs: The List endpoint have a paginate system that work passing page and limit as query parameter on the URL like `/products?page=2&limit=10`, if any parameter is passed the endpoint works with the default values `{ page: 1, limit: 10 }`
