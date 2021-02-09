const Sequelize = require('sequelize');
const db = require('../../config/tagabukidhrmisdb.js');


const HRMISOfficeTotalCasualDashboard = db.define('vw_hrmis_office_casual_total', {
    // Total Job Orders
    office: {
        type: Sequelize.STRING,
        allowNull: false
    },
    totalCasual: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

}, {
    tableName: 'vw_hrmis_office_casual_total',
    timestamps: false,
});

HRMISOfficeTotalCasualDashboard.removeAttribute('id');


module.exports = HRMISOfficeTotalCasualDashboard;