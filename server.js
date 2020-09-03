const express = require('express');
const app = express();
const apiRouter = require('./routes/apiRouter');
const { handleMongoDbErrors, handleServerErrors } = require('./error-handling/index');
const dbConnection = require('./db/connection'); // important - although the variable dbConnection isn't used in this file, it's creating the connection to our database

app.use(express.json()); 
app.use('/plantsubscriptionservice/v1', apiRouter); // this is our base-url - it's good to use versioning (the v1 at the end). The code means that a request coming in via the base url will get sent through to the apiRouter
app.use(handleMongoDbErrors);
app.use(handleServerErrors);

module.exports = app;