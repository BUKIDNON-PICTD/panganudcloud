const Sequelize = require('sequelize');
module.exports = new Sequelize('tagabukid_panganud', 'root', 'z7a18q', {
    host: '172.16.2.49',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});