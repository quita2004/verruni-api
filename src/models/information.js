const db = require('../loaders/db');

const tableName = 'information';
module.exports = {
    get: async () => {
        return db.select().table(tableName);
    },
    update: async(data)=>{
        return db(tableName).update(data);
    }
}