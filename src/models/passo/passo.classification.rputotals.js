const Sequelize = require('sequelize');
const db = require('../../config/tagabukidentitydb.js');


const classificationRpuTotals = db.define('vw_classificationrputotals', {
    classification :{
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
    totalrpulandtotalareasqm :{
        type: Sequelize.DOUBLE
    }
    
}, {
    tableName: "vw_classificationrputotals",
    timestamps: false
});

classificationRpuTotals.removeAttribute('id');

module.exports = classificationRpuTotals;