const { connection, configModel, DataTypes } = require('../loaders/sequelize');
const sequelize =  connection();

const attributes = {
    id: {//customer_id	order_id	created_at	updated_at	note	phone_number
        primaryKey: true,
        type: DataTypes.STRING,
    },
    customer_id: DataTypes.STRING,
    order_id: DataTypes.STRING,
    note: DataTypes.DECIMAL,
    phone_number: DataTypes.STRING,
};
const options = {
    sequelize,
    ...configModel,
    timestamps: true
};
const usersSequelize = sequelize.define('orders', attributes, options);

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