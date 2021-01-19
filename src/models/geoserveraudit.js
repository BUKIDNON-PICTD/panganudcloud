
const Sequelize = require('sequelize');
const db = require('../config/tagabukidgisdb.js');
const { truncate } = require('fs');

const GeoserverAudit = db.define('geoserver_audits', {
        id:{
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4
        },
        Service:{
            type:Sequelize.STRING,
            allowNull:true
        },
        Version:{
            type:Sequelize.STRING,
            allowNull:true
        },
        Operation:{
            type:Sequelize.STRING,
            allowNull:true
        },
        SubOperation:{
            type:Sequelize.STRING,
            allowNull:true
        },
        Resources:{
            type:Sequelize.STRING,
            allowNull:true
        },
        ResourcesProcessingTime:{
            type:Sequelize.STRING,
            allowNull:true
        },
        LabelsProcessingTime:{
            type:Sequelize.STRING,
            allowNull:true
        },
        Path:{
            type:Sequelize.STRING,
            allowNull:true
        },
        QueryString:{
            type:Sequelize.STRING,
            allowNull:true
        },
        Body:{
            type:Sequelize.STRING,
            allowNull:true
        },
        HttpMethod:{
            type:Sequelize.STRING,
            allowNull:true
        },
        StartTime:{
            type:Sequelize.STRING,
            allowNull:true
        },
        EndTime:{
            type:Sequelize.STRING,
            allowNull:true
        },
        TotalTime:{
            type:Sequelize.STRING,
            allowNull:true
        },
        RemoteAddr:{
            type:Sequelize.STRING,
            allowNull:true
        },
        RemoteHost:{
            type:Sequelize.STRING,
            allowNull:true
        },
        Host:{
            type:Sequelize.STRING,
            allowNull:true
        },
        RemoteUser:{
            type:Sequelize.STRING,
            allowNull:true
        },
        ResponseStatus:{
            type:Sequelize.STRING,
            allowNull:true
        },
        ResponseLength:{
            type:Sequelize.STRING,
            allowNull:true
        },
        ResponseContentType:{
            type:Sequelize.STRING,
            allowNull:true
        },
        CacheResult:{
            type:Sequelize.STRING,
            allowNull:true
        },
        MissReason:{
            type:Sequelize.STRING,
            allowNull:true
        },
        Failed:{
            type:Sequelize.STRING,
            allowNull:true
        }
},{
    timestamps: false,
});

module.exports = GeoserverAudit;


























