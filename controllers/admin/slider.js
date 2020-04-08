const models = require('../../src/models');

module.exports = {
    get: async (req, res) => {
        const title = 'Slider';
        const sliders = await models.Slider.get({});
        const sliderCategory = await models.SliderCategory.get();

        res.render('admin/pages/slider', {
            sliders,
            title,
            sliderCategory
        });
    }
}