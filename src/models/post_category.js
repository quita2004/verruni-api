const db = require('../loaders/db');

const tableName = 'post_category';
module.exports = {
    get: async () => {
        return db.select()
            .table(tableName);
    },
    getByParam: async ({id, url}) => {
        let select = db.select();
        if(id){
            select.where('post_category_id', id)
        }
        if(url){
            select.where('cate_url', url)
        }
        return select.table(tableName);
    }
}