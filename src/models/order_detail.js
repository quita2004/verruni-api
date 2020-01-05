const { connection, configModel, DataTypes } = require('../loaders/sequelize');
const sequelize =  connection();

const attributes = {
    id: {
        primaryKey: true,
        type: DataTypes.STRING,
    },
    order_id: DataTypes.STRING,
    product_id: DataTypes.STRING,
};
const options = {
    sequelize,
    ...configModel,
    timestamps: false
};
const usersSequelize = sequelize.define('order_detail', attributes, options);

module.exports = {
    create: async (entity) => {
        const data = await usersSequelize.create(entity);
        return data;
    },
    get: async () => {
        const data = await usersSequelize.findAll();
        return data;
    }
}