var express         = require('express'),
    routes          = express.Router();
var userController  = require('./controller/user-controller');
var globelabsController  = require('./controller/globe-controller');
var qrlogscontroller  = require('./controller/qrlogscontroller');
var covid19subscriberscontroller  = require('./controller/covid19subscriberscontroller');
var passport	    = require('passport');
const webpush = require('web-push');

routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);
routes.get('/globe-callback',globelabsController.subscribe);
routes.post('/globe-callback',globelabsController.unsubscribe);
routes.post('/globe-notify',globelabsController.receiveSMS);
routes.post('/globe-notifyall',globelabsController.notifyAllSubscribers);

routes.post('/qrlogs', qrlogscontroller.create);
routes.post('/covid19subscriber/subscribe',covid19subscriberscontroller.subscribe);
routes.post('/covid19subscriber/unsubscribe',covid19subscriberscontroller.unsubscribe);
routes.post('/covid19subscriber/checksubscriptionstatus',covid19subscriberscontroller.checksubscriptionstatus);
const fakeDatabase = []

routes.post('/covid19subscriber/subscribe2',(req,res)=>{
    const subscription = req.body
    fakeDatabase.push(subscription)
});

routes.post('/covid19subscriber/sendNotification', (req, res) => {
    const notificationPayload = {
      notification: {
        title: 'New Notification',
        body: 'This is the body of the notification',
        icon: 'assets/icons/icon-512x512.png',
      },
    }
  
    const promises = []
    fakeDatabase.forEach(subscription => {
      promises.push(
        webpush.sendNotification(
          subscription,
          JSON.stringify(notificationPayload)
        )
      )
    })
    Promise.all(promises).then(() => res.sendStatus(200))
  })


routes.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ msg: `Hey ${req.user.email}! I open at the close.` });
});

module.exports = routes;