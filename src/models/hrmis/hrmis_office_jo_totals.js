const Sequelize = require('sequelize');
const db = require('../../config/tagabukidhrmisdb.js');


const HRMISOfficeTotalJODashboard = db.define('vw_hrmis_office_jo_total', {
    // Total Job Orders
    office: {
        type: Sequelize.STRING,
        allowNull: false
    },
    totalJO: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

}, {
    tableName: 'vw_hrmis_office_jo_total',
    timestamps: false,
});

HRMISOfficeTotalJODashboard.removeAttribute('id');


module.exports = HRMISOfficeTotalJODashboard;