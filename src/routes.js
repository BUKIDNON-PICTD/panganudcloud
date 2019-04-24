var express         = require('express'),
    routes          = express.Router();
var userController  = require('./controller/user-controller');
var passport	    = require('passport');
 
routes.get('/', (req, res) => {
    return res.send('Hello, this is the API!');
});
 
routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);
 
routes.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ msg: `Hey ${req.user.email}! I open at the close.` });
});

// routes.get('/farmers', passport.authenticate('jwt', { session: false }), (req, res) => {
//     User2.findOne({
//         where:{
//             email:req.body.email
//         }
//     }).then(user => {
//         if (user){
//             return res.status(400).json({ 'msg': 'The user already exists' });
//         }

      
//         User2.create(req.body).then(newuser => {
//             return res.status(201).json(user);
//         }).catch(err => {
//             return res.status(400).json({ 'msg': err });
//         });

        
//     }).catch(err => {
//         return res.status(400).json({ 'msg': err });
//     });
// });
 
module.exports = routes;