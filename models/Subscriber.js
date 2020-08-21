const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const subscriberSchema = new Schema({
    username: {
        type: String, 
        required: true,
        min: 1,
        max: 15, 
        unique: true
    },
    password: {
        type: String,
        required: true, 
        select: false,
        bcrypt: true
    },
    subscriber: {
        type: Boolean, 
        default: true
    },
    plants: [{type: mongoose.Schema.Types.ObjectId, ref: 'Plants'}],
});
// the following code will automatically run when we try to save a new subscriber to the database
subscriberSchema.pre('save', function(next) {
    if(!this.isModified('password'))
        return next();
    bcrypt.hash(this.password, 10, (err, passwordHash) => {
        if(err)
            return next(err);
        this.password = passwordHash;
        next();
    });
});

// userSchema.methods.comparePassword = function(password, cb) {
//     bcrypt.compare(password, this.password, (err, isMatch) => {
//         if (err) 
//             return cb(err);
//         else {
//             if(!isMatch)
//                 return cb(null, isMatch);
//             return cb(null, this);
//         }
//     });
// }

const Subscriber = (module.exports = mongoose.model('Subscriber', subscriberSchema));

module.exports.get = function (callback, limit) {
    Subscriber.find(callback).limit(limit);
};

module.exports.getSubscriber = function (username) { 
    return Subscriber.findOne({ username })
    .then((subscriber) => { 
        return subscriber; 
    }); 
};

module.exports.updateSubscriber = async (username, updateBody) => {
    const subscriberExists = await Subscriber.exists({ username: username})
    if (!subscriberExists) {
      return new Promise (resolve => {
          resolve(null)
      })
    } else {
      return Subscriber.findOneAndUpdate({ username: username }, { $set: updateBody }, { new: true }, function (
        err,
        subscriber
      ) {
        return subscriber;
      });
    };
}

module.exports.getPlantsByName = function (username) {
    console.log(username)
    return Subscriber.findOne({ username: username }).populate('plants').then((subscriber) => {
      const plants = subscriber.plants;
      return plants;
    });
};

module.exports.insertPlants = function (subscriber, plants) {
    if (!Array.isArray(plants)) {
      return Subsciber.findOneAndUpdate({ username: subscriber }, { plants }, { new: true });
    }
    return Subscriber.findOneAndUpdate({ username: subscriber }, { plants: plants }, { new: true });
};