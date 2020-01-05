const { connection, configModel, DataTypes } = require('../loaders/sequelize');
const sequelize =  connection();

const attributes = {
    id: {
        primaryKey: true,
        type: DataTypes.STRING,
    },
    full_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
};
const options = {
    sequelize,
    ...configModel,
    timestamps: true
};
const usersSequelize = sequelize.define('order_detail', attributes, options);

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