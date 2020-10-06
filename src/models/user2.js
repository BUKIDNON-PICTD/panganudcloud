const Sequelize = require('sequelize');
const db = require('../config/tagabukidpanganuddb');
const bcrypt = require('bcrypt');

const User2 = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    hooks: {
        beforeCreate: async function(user) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    }
});

User2.prototype.validPassword = async function(password) {
    
    return await bcrypt.compare(password, this.password);
}

module.exports = User2;