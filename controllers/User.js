User = require('../models/User');

exports.addUser = function (req, res, next) {
    // get the username and password from the request body
    const { username, password } = req.body;
    // Search the database to see if username already exists
    User.findOne({username}, (err, user) => {
        if(err) return next(err);
        // If user exists, return status 400 and a message saying that the username already exists
        if(user) 
            res.status(400).json({message: {msgBody: "Username is already taken", msgError: true}});   
        else {
             // If username doesn't exist, then create a new user, passing in the username and password as arguments
            const newUser = new User({username, password});
            // save to database
            newUser.save(err => {
                if(err) return next(err)
                else
                //console log the password just to check whether the hashing and salting process has worked, delete afterwards
                console.log(newUser.password)
                //return happy status 201 with a json object containing a success message to be sent to client
                res.status(201).json({message: {msgBody: "Account successfully created", msgError: false}});
            })
        }
    });
}