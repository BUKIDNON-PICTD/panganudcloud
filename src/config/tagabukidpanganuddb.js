const Sequelize = require('sequelize');


module.exports = new Sequelize("tagabukid_panganud", global.gConfig.pgbclouddb.databaseuser, global.gConfig.pgbclouddb.databasepass, {
    host: global.gConfig.pgbclouddb.databasehost,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});