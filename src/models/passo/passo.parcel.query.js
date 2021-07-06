const Sequelize = require('sequelize');
const db = require('../../config/tagabukidentitydb.js');


const parcelQueryInfo = db.define('vw_parcelinfo', {
    owner :{
        type: Sequelize.STRING,
    },
    pin :{
        type: Sequelize.STRING,
    },
    landareasqm :{
        type: Sequelize.DECIMAL(2),
    },
    assessedvalue :{
        type: Sequelize.DECIMAL(2),
    },
    rputype :{
        type: Sequelize.STRING,
    },
    taxable :{
        type: Sequelize.INTEGER,
    },
    lotno :{
        type: Sequelize.STRING,
    },
    sectionno :{
        type: Sequelize.STRING,
    },
    brgy :{
        type: Sequelize.STRING,
    },
    lgu :{
        type: Sequelize.STRING,
    },
    
}, {
    tableName: "vw_parcelinfo",
    timestamps: false
});

parcelQueryInfo.removeAttribute('id');

module.exports = parcelQueryInfo;