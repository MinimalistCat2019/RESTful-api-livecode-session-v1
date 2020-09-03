const { getUser } = require('../models/User');
const User = require('../models/User');

exports.addUser = function (req, res, next) {
    // get the username and password from the request body
    const { username, password } = req.body;
    const user = new User({username: username, password:password});
    // save to database
    user.save(function (err) {
        if(err) return next(err);
        //return happy status 201 with a json object containing a success message to be sent to client
        res.status(201).json({message: {msgBody: "Account successfully created", msgError: false}});
    })
}

exports.index = function (req, res, next) {
    User.get(function (err, users) {
      if (err) return next(err);
      res.json({
        status: "success",
        message: "Users retrieved successfully",
        data: users
      });
    });
};

exports.sendUser = function (req, res, next) {
    getUser(req.params.username)
        .then(user => {
            if (user === null) {
                res.status(400).send({msg: 'Invalid username'})
            } else {
                res.status(200).send({user});
            }
        })
        .catch(next)
}

exports.removeUser = async (req, res, next) => {
    const userExists = await User.exists({ username: req.params.username})
    if (!userExists) {
      res.status(400).send({msg: 'User does not exist'})
    } else {
    User.findOneAndRemove({username: req.params.username}, function (err) {
      if (err) return res.status(400).send({msg: 'Invalid username'});
      res.json({
          status: "success",
          message: "User successfully deleted"
          });
      });
    }
}