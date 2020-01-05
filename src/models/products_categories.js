const { connection, configModel, DataTypes } = require('../loaders/sequelize');
const sequelize =  connection();

const attributes = {
    id: {
        primaryKey: true,
        type: DataTypes.STRING,
    },
    products: DataTypes.STRING,
    categories: DataTypes.STRING,
};
const options = {
    sequelize,
    ...configModel,
    timestamps: false
};
const modelSequelize = sequelize.define('products_categories', attributes, options);

module.exports = {
    create: async (entity) => {
        const data = await modelSequelize.create(entity);
        return data;
    },
    get: async () => {
        const data = await modelSequelize.findAll();
        return data;
    }
}