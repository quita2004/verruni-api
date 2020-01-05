const { connection, configModel, DataTypes } = require('../loaders/sequelize');
const sequelize =  connection();

const attributes = {
    id: {
        primaryKey: true,
        type: DataTypes.STRING,
    },
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    description: DataTypes.STRING,
    content: DataTypes.STRING,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
    image_thumbnail: DataTypes.STRING,
};
const options = {
    sequelize,
    ...configModel,
    timestamps: true
};
const usersSequelize = sequelize.define('products', attributes, options);

module.exports = {
    create: async (entity) => {
        const data = await usersSequelize.create(entity);
        return data;
    },
    getAll: async () => {
        const data = await usersSequelize.findAll();
        return data;
    },
    get: async(id)=>{
        const data = await modelSequelize.findByPk(id);
        return data;
    }
}