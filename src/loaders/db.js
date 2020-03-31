const configs = require('../config');

module.exports = require('knex')({
    client: configs.db.dialect,
    connection: {
        host: configs.db.host,
        user: configs.db.username,
        password: configs.db.password,
        database: configs.db.name
    }
});
