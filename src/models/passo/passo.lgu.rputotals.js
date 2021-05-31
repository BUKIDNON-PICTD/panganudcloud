const Sequelize = require('sequelize');
const db = require('../../config/tagabukidentitydb.js');


const lguRpuTotals = db.define('vw_lgurputotals', {
    lgu :{
        type: Sequelize.STRING,
    },
    lguid :{
        type: Sequelize.STRING,
    },
    totalrpus :{
        type: Sequelize.INTEGER,
    },
    totalrpuland :{
        type: Sequelize.INTEGER,
    },
    totalrpubldg :{
        type: Sequelize.INTEGER,
    },
    totalrpumach :{
        type: Sequelize.INTEGER,
    },
    totalrpuplanttree: {
        type: Sequelize.INTEGER,
    },
    totalrpumisc :{
        type: Sequelize.INTEGER,
    },
    
}, {
    tableName: "vw_lgurputotals",
    timestamps: false
});

lguRpuTotals.removeAttribute('id');

module.exports = lguRpuTotals;