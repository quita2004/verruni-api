const models = require('../src/models');
const enums = require('../src/enums');
const common = require('../common');

module.exports = {
    index: async (req, res) => {
        const commonData = await common.getCommonData();
        const sliders = await models.Slider.get({category: enums.Slider.Home});

        const post = await models.Post.get({});

        post.map(item => {
            item.image = common.getFileUrl(item.image);
        });

        const services = post.filter(item => {
            if (item.category === enums.Post.service) {
                return item;
            }
        });

        const advisory = post.filter(item => {
            if (item.category === enums.Post.advisory) {
                return item;
            }
        });

        const support = post.filter(item => {
            if (item.category === enums.Post.support) {
                return item;
            }
        });

        res.render('pages/index', {
            ...commonData,
            sliders,
            services,
            advisory,
            support
        });
    },
    page: async (req, res) => {
        const commonData = await common.getCommonData();

        const { url } = req.params;

        const post = await models.Post.get({ url: '/' + url });
        if (post.length === 0) {
            res.sendStatus(404);
            return;
        }

        if (post[0].category < 4) {
            post.cate = await models.PostCategory.getByParam({ id: post[0].category })
        }

        res.render('pages/post', {
            ...commonData,
            post: post[0]
        });
    },
    service: async (req, res) => {
        const commonData = await common.getCommonData();
        const originalUrl = req.originalUrl;
        const cateUrl = originalUrl.split("/").join("");
        const category = await models.PostCategory.getByParam({ url: cateUrl });

        const items = await models.Post.get({ category: category[0].post_category_id });
        items.map(item => {
            item.image = common.getFileUrl(item.image);
        });
        const cate = {
            items,
            title: category[0].category_name,
        }
        res.render('pages/category', {
            ...commonData,
            cate
        });
    }
}