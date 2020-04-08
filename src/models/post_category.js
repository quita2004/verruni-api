const db = require('../loaders/db');

const tableName = 'post_category';
module.exports = {
    get: async () => {
        return db.select()
            .table(tableName);
    }
}