const Sequelize = require('sequelize');
const db = require('../../config/tagabukidhrmisdb.js');


const HRMISOfficeTotalCasualDashboard = db.define('vw_hrmis_position_total', {
    // Total Job Orders
    position: {
        type: Sequelize.STRING,
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
    Casual: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    JO: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    CasualMale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    JOMale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    CasualFemale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    JOFemale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    total: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

}, {
    tableName: 'vw_hrmis_position_total',
    timestamps: false,
});

HRMISOfficeTotalCasualDashboard.removeAttribute('id');


module.exports = HRMISOfficeTotalCasualDashboard;