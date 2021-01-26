const Sequelize = require('sequelize');
const db = require('../config/tagabukidgisdb.js');


const VaccineSurveyDashboard = db.define('vw_bukidnoncovid19_vac_survey_totals', {
    totalYes: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalNo: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalUndecided: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalRespondents: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalMaleYes: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalMaleNo: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalMaleUndecided: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalFemaleYes: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalFemaleNo: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalFemaleUndecided: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalYoungAdult: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalEarlyAdult: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalAdult: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalMiddleAdult: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalLateAdult: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalSenior: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'vw_bukidnoncovid19_vac_survey_totals',
    timestamps: false,
});

VaccineSurveyDashboard.removeAttribute('id');


module.exports = VaccineSurveyDashboard;