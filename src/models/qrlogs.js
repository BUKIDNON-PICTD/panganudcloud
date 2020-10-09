const Sequelize = require('sequelize');
const db = require('../config/tagabukidgisdb.js');
const bcrypt = require('bcrypt');
const { truncate } = require('fs');

const Qrlogs = db.define('bukidnoncovid19_qrlogs', {
    objid: {
        type: Sequelize.STRING,
        primaryKey: truncate
    },
    locationid :{
        type: Sequelize.STRING,
        allowNull: false
    },
    deviceid :{
        type: Sequelize.STRING,
        allowNull: false
    },
    rawdata: {
        type: Sequelize.STRING,
        allowNull: false
    },
    txndatetime: {
        type: 'TIMESTAMP',
        allowNull: false
    },
    personobjid: {
        type: Sequelize.STRING,
         allowNull: false
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
    }
});

module.exports = Qrlogs;