// var User = require('../models/user');
var User2 = require('../models/user2');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
// var db = require('../config/database');
// var bcrypt = require('bcrypt');

function createToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
        expiresIn: 86400 // 86400 expires in 24 hours
      });
}

exports.registerUser = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ 'msg': 'You need to send email and password' });
    }

    //mysql
    User2.findOne({
        where:{
            email:req.body.email
        }
    }).then(user => {
        if (user){
            return res.status(400).json({ 'msg': 'The user already exists' });
        }

      
        User2.create(req.body).then(newuser => {
            return res.status(201).json(user);
        }).catch(err => {
            return res.status(400).json({ 'msg': err });
        });

        
    }).catch(err => {
        return res.status(400).json({ 'msg': err });
    });
    //mongo
    // User.findOne({ email: req.body.email }, (err, user) => {
    //     if (err) {
    //         return res.status(400).json({ 'msg': err });
    //     }
 
    //     if (user) {
    //         return res.status(400).json({ 'msg': 'The user already exists' });
    //     }
 
    //     let newUser = User(req.body);
    //     newUser.save((err, user) => {
    //         if (err) {
    //             return res.status(400).json({ 'msg': err });
    //         }
    //         return res.status(201).json(user);
    //     });
    // });
};
 
exports.loginUser = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ 'msg': 'You need to send email and password' });
    }
    //mysql
    User2.findOne({
        where:{
            email:req.body.email
        }
    }).then(async function (user) {
        if (!await user.validPassword(req.body.password)) {
            return res.status(400).json({ msg: 'The email and password don\'t match.' });
        } else {
            return res.status(200).json({
                token: createToken(user)
            });
        }
    }).catch(err => {
        return res.status(400).json({ 'msg': 'The user does not exist' });
    });
    //mongo
    // User.findOne({ email: req.body.email }, (err, user) => {
    //     if (err) {
    //         return res.status(400).send({ 'msg': err });
    //     }
 
    //     if (!user) {
    //         return res.status(400).json({ 'msg': 'The user does not exist' });
    //     }
 
    //     user.comparePassword(req.body.password, (err, isMatch) => {
    //         if (isMatch && !err) {
    //             return res.status(200).json({
    //                 token: createToken(user)
    //             });
    //         } else {
    //             return res.status(400).json({ msg: 'The email and password don\'t match.' });
    //         }
    //     });
    // });
};