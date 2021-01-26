const Sequelize = require('sequelize');
const db = require('../config/tagabukidgisdb.js');


const VaccineSurveyDashboard = db.define('vw_bukidnoncovid19_vac_survey_totals', {
    // Total Vote
    totalyes: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalno: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalundecided: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    // Total
    totalmale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalfemale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalresponse: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    // By gender male
    totalyesmale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalnomale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalundecidedmale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    // By gender female
    totalyesfemale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalnofemale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalundecidedfemale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    a10below: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    a11to20: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    a21to30: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    a31to40: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    a41to50: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    a51to60: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    a61to70: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    a71to80: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    a81above: {
        type: Sequelize.INTEGER,
        allowNull: true
    }

}, {
    tableName: 'vw_bukidnoncovid19_vac_survey_totals',
    timestamps: false,
});

VaccineSurveyDashboard.removeAttribute('id');


module.exports = VaccineSurveyDashboard;