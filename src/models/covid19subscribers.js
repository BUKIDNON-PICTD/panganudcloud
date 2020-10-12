const Sequelize = require('sequelize');
const db = require('../config/tagabukidgisdb.js');


const Subscribers = db.define('bukidnoncovid19_subscribers', {
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
        allowNull: true
    },
    push_access_token: {
        type: Sequelize.STRING,
        allowNull: true
    },
    sms_access_token: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = Subscribers;