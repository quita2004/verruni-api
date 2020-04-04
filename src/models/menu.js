const db = require('../loaders/db');

const tableName = 'menu';
module.exports = {
    get: async(category) => {
        return db.select()
            .where('category', category)
            .table(tableName);
    }
}