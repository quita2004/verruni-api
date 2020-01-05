const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('verruni-nodejs', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

var User = sequelize.define('users',
    {
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
    },
    {
        sequelize,
        freezeTableName: true,
        timestamps: false,
        underscored: true,
    }
);

User.create({
    id: 'janedoe2',
    username: 'janedoe',
    email: 'janedoe',
    password: 'janedoe',
    phoneNumber: '1323123'
})
    .then(jane => {
        console.log(jane.toJSON());
    });