const express = require('express');
const app = express();
const apiRouter = require('./routes/apiRouter');
const dbConnection = require('./db/connection'); 

app.use(express.json());
app.use('/plantsubcriptionservice/v1', apiRouter)

module.exports = app;