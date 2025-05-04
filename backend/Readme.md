# Getting Started

## Install Dependencies

In the project directory, you can run:

### `npm install`

Installs all the required backend dependencies based on package.json.

## Set up config details

Create a .env file in the directory and configure the following parameters based on your local environment.

PORT= # port number

DBUSER= # postgres db username \
DBPASSWORD= # postgres db password \
DBHOST= # postgres db host url \
DBPORT= # postgres db port number \
DBNAME= # postgres db name

## Run the server

### `npx nodemon app.js` OR `node app.js`

nodemon will re-run the server anytime changes are detected. Vanilla node can also be used.
