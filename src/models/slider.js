const db = require('../loaders/db');
const tableName = 'slider';

module.exports = {
    get: async ({ id, category }) => {
        let select = db(tableName).select();
        if (id) {
            select = select.where('id', id);
        }
        if (category) {
            select = select.where('category', category);

        }
        select = select.innerJoin('slider_category', 'slider.category', 'slider_category.slider_category_id');

        return select;
    },
    create: async (data) => {
        return db.insert(data).into(tableName).returning();
    },
    update: async (data) => {
        const entity = {
            title: data.title,
            category: data.category
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