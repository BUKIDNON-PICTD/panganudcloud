const Sequelize = require('sequelize');


module.exports = new Sequelize('tagabukid_gis', global.gConfig.pgbcloudgisdb.databaseuser, global.gConfig.pgbcloudgisdb.databasepass, {
    host: global.gConfig.pgbcloudgisdb.databasehost,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000, 
        idle: 10000
    },
    logging: false
});