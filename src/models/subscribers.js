const Sequelize = require('sequelize');
const db = require('../config/tagabukidpanganuddb');
const bcrypt = require('bcrypt');

const Subscribers = db.define('subscribers', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    state :{
        type: Sequelize.STRING,
        allowNull: false
    },
    subscriber_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    mobile_number: {
        type: Sequelize.STRING,
        allowNull: false
    },
    access_token: {
        type: Sequelize.STRING,
        allowNull: false
    },
    access_token: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Subscribers;