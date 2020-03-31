const db = require('../loaders/db');

module.exports = {
    get: async () => {
        return db.select().table('information');
    }
}