const db = require('../loaders/db');

const tableName = 'product';
module.exports = {
    get: async ({ id, url }) => {
        let select = db.select();
        if (id) {
            select = select.where('id', id);
        }
        if (url) {
            select = select.where('url', url);
        }
        select = select
            .table(tableName);

        return select;
    },
    create: async (data) => {
        return db.insert(data).into(tableName).returning();
    },
    update: async (data) => {
        const entity = {
            category: data.category,
            description: data.description,
            name: data.name,
            url: data.url,
            price: data.price
        };

        if (data.image) {
            entity.image = data.image;
        }
        return db(tableName).where('id', data.id).update(entity);
    },
    delete: async (id) => {
        const data = await db(tableName).where('id', id).select().first();
        await db(tableName).where('id', id).del();
        return data;
    }
}