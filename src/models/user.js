const db = require('../loaders/db');

const tableName = 'user';
module.exports = {
    get: async(username) => {
        return db.select()
            .where('username', username)
            .table(tableName).first();
    },
    create: async(user)=>{
        return db.insert(user).into(tableName).returning();
    }
}