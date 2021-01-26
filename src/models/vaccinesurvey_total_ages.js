const Sequelize = require('sequelize');
const db = require('../config/tagabukidgisdb.js');


const VaccineSurveyDashboard = db.define('vw_bukidnoncovid19_vac_survey_ages', {
    // Total Vote
    agerange: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    yes: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    no: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    // Total
    undecided: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

}, {
    tableName: 'vw_bukidnoncovid19_vac_survey_ages',
    timestamps: false,
});

VaccineSurveyDashboard.removeAttribute('id');


module.exports = VaccineSurveyDashboard;