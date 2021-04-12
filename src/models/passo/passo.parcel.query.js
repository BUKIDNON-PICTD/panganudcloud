const Sequelize = require('sequelize');
const db = require('../../config/tagabukidentitydb.js');


const parcelQueryInfo = db.define('vw_parcelinfo', {
    faasid :{
        type: Sequelize.STRING,
    },
    owner :{
        type: Sequelize.STRING,
    },
    titletype :{
        type: Sequelize.STRING,
    },
    titleno :{
        type: Sequelize.STRING,
    },
    titledate :{
        type: Sequelize.DATE,
    },
    pin :{
        type: Sequelize.STRING,
    },
    landareasqm :{
        type: Sequelize.DOUBLE,
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