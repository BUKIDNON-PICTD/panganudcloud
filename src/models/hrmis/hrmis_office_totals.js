const Sequelize = require('sequelize');
const db = require('../../config/tagabukidhrmisdb.js');


const HRMISOfficeTotalCasualDashboard = db.define('vw_hrmis_office_total', {
    // Total Job Orders
    org: {
        type: Sequelize.STRING,
        allowNull: false
    },
    totalCasual: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalJO: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    male: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    female: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalCasualMale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalJOMale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalCasualFemale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalJOFemale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    total: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

}, {
    tableName: 'vw_hrmis_office_total',
    timestamps: false,
});

HRMISOfficeTotalCasualDashboard.removeAttribute('id');


module.exports = HRMISOfficeTotalCasualDashboard;