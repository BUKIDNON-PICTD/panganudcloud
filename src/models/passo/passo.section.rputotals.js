const Sequelize = require('sequelize');
const db = require('../../config/tagabukidentitydb.js');


const sectionRpuTotals = db.define('vw_barangaysectionrputotals', {
    section :{
        type: Sequelize.STRING,
    },
    barangayid :{
        type: Sequelize.STRING,
    },
    lguid :{
        type: Sequelize.STRING,
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
    tableName: "vw_barangaysectionrputotals",
    timestamps: false
});

sectionRpuTotals.removeAttribute('id');

module.exports = sectionRpuTotals;