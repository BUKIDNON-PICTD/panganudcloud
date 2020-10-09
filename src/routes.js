var express         = require('express'),
    routes          = express.Router();
var userController  = require('./controller/user-controller');
var globelabsController  = require('./controller/globe-controller');
var qrlogscontroller  = require('./controller/qrlogscontroller');
var covid19subscriberscontroller  = require('./controller/covid19subscriberscontroller');
var passport	    = require('passport');

routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);
routes.get('/globe-callback',globelabsController.subscribe);
routes.post('/globe-callback',globelabsController.unsubscribe);
routes.post('/globe-notify',globelabsController.receiveSMS);
routes.post('/globe-notifyall',globelabsController.notifyAllSubscribers);

routes.post('/qrlogs', qrlogscontroller.create);
routes.post('/covid19subscriber/subscribe',covid19subscriberscontroller.subscribe);
routes.post('/covid19subscriber/unsubscribe',covid19subscriberscontroller.unsubscribe);

routes.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ msg: `Hey ${req.user.email}! I open at the close.` });
});

module.exports = routes;