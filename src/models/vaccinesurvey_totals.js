const Sequelize = require('sequelize');
const db = require('../config/tagabukidgisdb.js');


const VaccineSurveyDashboard = db.define('vw_bukidnoncovid19_vac_survey_totals', {
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
    totalmale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalfemale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalprofiles: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
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
    totalage20to30: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalage30to40: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'vw_bukidnoncovid19_vac_survey_totals',
    timestamps: false,
});

VaccineSurveyDashboard.removeAttribute('id');


module.exports = VaccineSurveyDashboard;