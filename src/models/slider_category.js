const db = require('../loaders/db');

const tableName = 'slider_category';
module.exports = {
    get: async () => {
        return db.select()
            .table(tableName);
    }
}