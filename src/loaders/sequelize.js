const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config');

let sequelize;
const connection = () => {
    if (!sequelize) {
        sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, {
            host: config.db.host,
            dialect: config.db.dialect
        });
    }

    return sequelize;
}

const configModel = {
    freezeTableName: true,
    underscored: true,
}
module.exports = {
    connection,
    configModel,
    DataTypes
};