const apiRouter = require('express').Router();
const { addUser, index, sendUser, removeUser } = require('../controllers/User');
const { sendSubscriber, removeSubscriber, addSubscriber, indexSub, updateSubscriberStatus, viewPlants, addPlantsToSubscriber } = require('../controllers/Subscriber');
const { indexPlant, addPlant, sendPlant } = require('../controllers/Plant');

apiRouter.route('/users')
    .post(addUser)
    .get(index);

apiRouter.route("/users/:username")
    .get(sendUser)
    .delete(removeUser)

apiRouter.route('/subscribers')
    .post(addSubscriber)
    .get(indexSub);

apiRouter.route("/subscribers/:username")
    .get(sendSubscriber)
    .delete(removeSubscriber)
    .patch(updateSubscriberStatus);


// apiRouter.route('/plantsbysubscriber/:username')
//     .get(viewPlants)  
//     .patch(addPlantsToSubscriber)

apiRouter.route('/plants')
    .get(indexPlant)
    .post(addPlant);

apiRouter.route('/plants/:name')
    .get(sendPlant);

module.exports = apiRouter;