const Sequelize = require('sequelize');
const db = require('../../config/tagabukidgisdb.js');
const { truncate } = require('fs');

const PreVacProfile = db.define('bukidnoncovid19_prevac', {
    objid: {
        type: Sequelize.STRING,
        primaryKey: truncate
    },
    lastname : {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstname : {
        type: Sequelize.STRING,
        allowNull: false
    },
    middlename : {
        type: Sequelize.STRING,
        allowNull: false
    },
    birthdate : {
        type: Sequelize.DATE,
        allowNull: false
    },
    gender : {
        type: Sequelize.STRING,
        allowNull: false
    },
    civilstatus : {
        type: Sequelize.STRING,
        allowNull: false
    },
    mobileno : {
        type: Sequelize.STRING,
        allowNull: false
    },
    address_province_code : {
        type: Sequelize.STRING,
        allowNull: false
    },
    address_province_lguname : {
        type: Sequelize.STRING,
        allowNull: false
    },
    address_municipality_code : {
        type: Sequelize.STRING,
        allowNull: false
    },
    address_municipality_lguname : {
        type: Sequelize.STRING,
        allowNull: false
    },
    address_barangay_code : {
        type: Sequelize.STRING,
        allowNull: false
    },
    address_barangay_lguname : {
        type: Sequelize.STRING,
        allowNull: false
    },
    address_street : {
        type: Sequelize.STRING,
        allowNull: false
    },
    scheddate : {
        type: Sequelize.DATE,
        allowNull: false
    }
});

module.exports = PreVacProfile;