const models = require('../../src/models');

module.exports = {
    get: async (req, res) => {
        const title = 'Thông tin';
        const info = await models.Information.get();

        res.render('admin/pages/info', {
            info: info[0],
            title
        });
    }
}