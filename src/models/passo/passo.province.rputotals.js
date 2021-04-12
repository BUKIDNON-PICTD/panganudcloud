const Sequelize = require('sequelize');
const db = require('../../config/tagabukidentitydb.js');


const rpuTotals = db.define('vw_rputotals', {
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
    tableName: "vw_rputotals",
    timestamps: false
});

rpuTotals.removeAttribute('id');

module.exports = rpuTotals;