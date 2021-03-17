const Sequelize = require('sequelize');
const db = require('../../config/tagabukidhrmisdb.js');


const HRMISAgeGroupTotalDashboard = db.define('vw_hrmis_agegroup_total', {
    // Total Job Orders
    agegroup: {
        type: Sequelize.STRING,
        allowNull: false
    },
    totalJO: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalCasual: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalMale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalFemale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalCasualMale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalCasualFemale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalJOMale: {
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
    tableName: 'vw_hrmis_agegroup_total',
    timestamps: false,
});

HRMISAgeGroupTotalDashboard.removeAttribute('id');


module.exports = HRMISAgeGroupTotalDashboard;