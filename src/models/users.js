const { connection, configModel, DataTypes } = require('../loaders/sequelize');
const sequelize =  connection();

const attributes = {
    id: {
        primaryKey: true,
        type: DataTypes.STRING,
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    fullName: DataTypes.STRING,
    address: DataTypes.STRING,
};
const options = {
    sequelize,
    ...configModel,
    timestamps: true
};
const modelSequelize = sequelize.define('users', attributes, options);

module.exports = {
    create: async (entity) => {
        const data = await modelSequelize.create(entity);
        return data;
    },
    getAll: async () => {
        const data = await modelSequelize.findAll();
        return data;
    },
    get: async(id)=>{
        const data = await modelSequelize.findByPk(id);
        return data;
    }
}