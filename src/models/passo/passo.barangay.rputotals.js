const Sequelize = require('sequelize');
const db = require('../../config/tagabukidentitydb.js');


const barangayRpuTotals = db.define('vw_barangayrputotals', {
    barangay :{
        type: Sequelize.STRING,
    },
    barangayid :{
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
    tableName: "vw_barangayrputotals",
    timestamps: false
});

barangayRpuTotals.removeAttribute('id');

module.exports = barangayRpuTotals;