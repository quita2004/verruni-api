const db = require('../loaders/db');
const tableName = 'slider';

module.exports = {
    get: async ({id, category}) => {
        let select = db.select();
        if (id) {
            select = select.where('id', id);
        }
        if (category) {
            select = select.where('category', category);

        }
        select = select.table(tableName);

        return select;
    },
    create: async (data) => {
        return db.insert(data).into(tableName).returning();
    },
    update: async (data) => {
        const entity = {
            title: data.title
        };
        if (data.image) {
            entity.image = data.image;
        }
        return db(tableName).where('id', data.id).update(entity);
    },
    delete: async(id)=>{
        return db(tableName).where('id', id).del();
    }
}