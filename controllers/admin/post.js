const models = require('../../src/models');

module.exports = {
    get: async (req, res) => {
        const posts = await models.Post.get({});

        res.render('admin/pages/post', {
            title: 'Bài viết',
            posts
        });
    }
}