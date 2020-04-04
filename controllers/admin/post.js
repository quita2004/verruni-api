const models = require('../../src/models');
const common = require('../../common');

module.exports = {
    get: async (req, res) => {
        const title = 'Bài viết';
        const posts = await models.Post.get({});
        posts.map(post => {
            post.image = common.getFileUrl(post.image);
        });

        const post_category = await models.PostCategory.get();

        res.render('admin/pages/post', {
            posts,
            post_category,
            title,
            common
        });
    }
}