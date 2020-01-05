const { connection, configModel, DataTypes } = require('../loaders/sequelize');
const sequelize =  connection();

const attributes = {
    id: {
        primaryKey: true,
        type: DataTypes.STRING,
    },
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image_thumbnail: DataTypes.STRING,
};
const options = {
    sequelize,
    ...configModel,
    timestamps: false
};
const modelSequelize = sequelize.define('categories', attributes, options);

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