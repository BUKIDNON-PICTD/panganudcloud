const Sequelize = require('sequelize');
const db = require('../../config/tagabukidgisdb.js');


const Covid19SymptomsDashboard = db.define('covidcasesview', {
    address_muncity :{
        type: Sequelize.STRING,
    },
    totalconfirmed :{
        type: Sequelize.INTEGER,
    },
    totalsymptomatic :{
        type: Sequelize.INTEGER,
    },
    totalasymptomatic :{
        type: Sequelize.INTEGER,
    },
    totalsymptomaticmale :{
        type: Sequelize.INTEGER,
    },
    totalsymptomaticfemale :{
        type: Sequelize.INTEGER,
    },
    totalasymptomaticmale :{
        type: Sequelize.INTEGER,
    },
    totalasymptomaticfemale :{
        type: Sequelize.INTEGER,
    },
    below10 :{
        type: Sequelize.INTEGER,
    },
    "11-20" :{
        type: Sequelize.INTEGER,
    },
    "21-30" :{
        type: Sequelize.INTEGER,
    },
    "31-40" :{
        type: Sequelize.INTEGER,
    },
    "41-50" :{
        type: Sequelize.INTEGER,
    },
    "51-60" :{
        type: Sequelize.INTEGER,
    },
    "61-70" :{
        type: Sequelize.INTEGER,
    },
    "71-80" :{
        type: Sequelize.INTEGER,
    },
    "81above" :{
        type: Sequelize.INTEGER,
    },
}, {
    tableName: "covidcasesview",
    timestamps: false
});

Covid19SymptomsDashboard.removeAttribute('id');

module.exports = Covid19SymptomsDashboard;