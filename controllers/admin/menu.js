const models = require('../../src/models');
const enums = require('../../src/enums');

module.exports = {
    get: async (req, res) => {
        const title = 'Menu dưới ảnh banner';

        const menus = await models.Menu.get({category:enums.Menu.Home});
        const posts = await models.Post.get({category: enums.Post.service});
        res.render('admin/pages/menu', {
            title,
            menus,
            posts
        });
    }
}