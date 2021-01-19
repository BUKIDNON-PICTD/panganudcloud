const Sequelize = require('sequelize');
const db = require('../config/tagabukidgisdb.js');


const Deposits = db.define('bukidnoncovid19_vac_survey', {
    objid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    profileid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    profiledata: {
        type: Sequelize.STRING,
        allowNull: false
    },
    answer: {
        type: Sequelize.STRING,
        allowNull: false
    },
    reason: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    hooks: {
       
    }
});


module.exports = Deposits;