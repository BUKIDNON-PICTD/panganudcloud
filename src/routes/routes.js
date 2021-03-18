var express         = require('express'),
    routes          = express.Router();
var userController  = require('../controller/user-controller');
var globelabsController  = require('../controller/globe-controller');



var passport	    = require('passport');
const webpush = require('web-push');

require("./covid.routes")(routes);

routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);
routes.get('/globe-callback',globelabsController.subscribe);
routes.post('/globe-callback',globelabsController.unsubscribe);
routes.post('/globe-notify',globelabsController.receiveSMS);
routes.post('/globe-notifyall',globelabsController.notifyAllSubscribers);

routes.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ msg: `Hey ${req.user.email}! I open at the close.` });
});



module.exports = routes;