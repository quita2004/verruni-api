const models = require('../src/models');
const enums = require('../src/enums');

function getUrl(str) {
    return str.trim().toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D')
        .replace(/ /g, '-');
}

function getFileUrl(name) {
    name = name ? name : 'noimage.png'
    return '/uploads/images/' + name;
}

async function getCommonData() {
    const menus = await models.Menu.get(enums.Menu.Home);
    const data = await models.Information.get();
    const info = data[0];
    const guide = await models.Post.get({ category: enums.Post.advisory });

    guide.map(item => {
        item.image = getFileUrl(item.image);
    });

    return {
        menus,
        info,
        guide
    };
}

module.exports = {
    getUrl,
    getFileUrl,
    getCommonData,
}