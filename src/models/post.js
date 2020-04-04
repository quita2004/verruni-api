const db = require('../loaders/db');
const tableName = 'post';

module.exports = {
    get: async ({ id, category, url }) => {
        let select = db.select();
        if (id) {
            select = select.where(tableName+ '.id', id);
        }
        if (category) {
            select = select.where('category', category);
        }
        if (url) {
            select = select.where('url', url);
        }
        select = select.innerJoin('post_category', tableName + '.category', 'post_category.post_category_id')
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
            content: data.content,
            title: data.title,
            url: data.url
        };

        if (data.image) {
            entity.image = data.image;
        }
        return db(tableName).where('id', data.id).update(entity);
    },
    delete: async (id) => {
        return db(tableName).where('id', id).del();
    }
}