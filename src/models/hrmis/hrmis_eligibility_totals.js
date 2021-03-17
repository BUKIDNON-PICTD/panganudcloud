const Sequelize = require('sequelize');
const db = require('../../config/tagabukidhrmisdb.js');


const HRMISEligibilityTotalDashboard = db.define('vw_hrmis_eligibility_total', {
    totalEligible: {
        type: Sequelize.STRING,
        allowNull: false
    },
    totalNotEligible: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalEligibleJO: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalEligibleCasual: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalNotEligibleJO: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalNotEligibleCasual: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalEligibleMale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalEligibleFemale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalNotEligibleMale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalNotEligibleFemale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalEligibleJOMale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalEligibleJOFemale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalNotEligibleJOMale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalNotEligibleJOFemale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalEligibleCasualMale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalEligibleCasualFemale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalNotEligibleCasualMale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalNotEligibleCasualFemale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    total: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

}, {
    tableName: 'vw_hrmis_eligibility_total',
    timestamps: false,
});

HRMISEligibilityTotalDashboard.removeAttribute('id');


module.exports = HRMISEligibilityTotalDashboard;