const models = require('../../src/models');
const common = require('../../common');

module.exports = {
    get: async (req, res) => {
        const title = 'Sản phẩm';
        const product = await models.Product.get({});
        product.map(item => {
            item.image = common.getFileUrl(item.image);
        });

        res.render('admin/pages/product', {
            product,
            title,
            common
        });
    }
}