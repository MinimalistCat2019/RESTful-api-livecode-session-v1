const apiRouter = require('express').Router();
const User = require('../models/User');
const {addUser} = require('../controllers/User');

apiRouter.route('/users')
    .post(addUser);

module.exports = apiRouter;