const db = require('../loaders/db');

module.exports = {
    get: async(category) => {
        return db.select()
            .where('category', category)
            .table('menu');
    }
}