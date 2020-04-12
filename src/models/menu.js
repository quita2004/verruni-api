const db = require('../loaders/db');

const tableName = 'menu';
module.exports = {
    get: async({category, id}) => {
        let select =  db(tableName).select('menu.*', 'post.url', 'post.title');
        if(category){
            select = select.where('menu_category', category);
        }
        if(id){
            select = select.where('menu.id', id);
        }
           
        return select.innerJoin('post', 'menu.post_id', 'post.id');
    },
    create: async (data) => {
        return db.insert(data).into(tableName).returning();
    },
    update: async (data) => {
        const entity = {
            post_id: data.post_id,
            menu_category: data.menu_category
        };
        return db(tableName).where('id', data.id).update(entity);
    },
    delete: async (id) => {
        const data = await db(tableName).where('id', id).select().first();
        await db(tableName).where('id', id).del();
        return data;
    }
}