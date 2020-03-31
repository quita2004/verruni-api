const models = require('../src/models');
const enums = require('../src/enums');

module.exports = {
    index: async(req, res) => {
        const infor = await models.Information.get();
        const menus = await models.Menu.get(enums.Menu.Home);
        console.log(menus);

        res.render('pages/index', {
            infor,
            menus
        });
    }
}