const Sequelize = require('sequelize');


module.exports = new Sequelize('tagabukid_hrmis', global.gConfig.databaseuser, global.gConfig.databasepass, {
    host: global.gConfig.databasehost,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false
});