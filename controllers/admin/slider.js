const models = require('../../src/models');

const tableName = 'slider';
module.exports = {
    get: async (req, res) => {
        const sliders = await models.Slider.get({});

        res.render('admin/pages/slider', {
            sliders: sliders
        });
    }
}