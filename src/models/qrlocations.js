const Sequelize = require('sequelize');
const db = require('../config/tagabukidgisdb.js');
const { truncate } = require('fs');

const QRlocations = db.define('bukidnoncovid19_qrlocations', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: truncate
    },
    locationid :{
        type: Sequelize.STRING,
        allowNull: false
    },
    locationname :{
        type: Sequelize.STRING,
        allowNull: false
    },
    address_province :{
        type: Sequelize.STRING,
        allowNull: false
    },
    address_barangay :{
        type: Sequelize.STRING,
        allowNull: false
    },
    address_municipality :{
        type: Sequelize.STRING,
        allowNull: false
    },
    address_streetpurok :{
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    timestamps: false
});

module.exports = QRlocations;