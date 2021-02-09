const Sequelize = require('sequelize');
const db = require('../../config/tagabukidhrmisdb.js');


const HRMISPDSDashboard = db.define('vw_hrmis_pds_totals', {
    // Total Job Orders
    totalJO: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalMaleJO: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalFemaleJO: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    // Total Casuals
    totalCasual: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalMaleCasual: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalFemaleCasual: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    // Total Retirables
    totalRetirable: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalNotRetirable: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    // Total Gender
    totalMale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalFemale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalRecord: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

}, {
    tableName: 'vw_hrmis_pds_totals',
    timestamps: false,
});

HRMISPDSDashboard.removeAttribute('id');


module.exports = HRMISPDSDashboard;