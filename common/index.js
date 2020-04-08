const models = require('../src/models');
const enums = require('../src/enums');

function getUrl(str) {
    if(!str) return "";
    return str.trim().toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D')
        .replace(/[^\w\s]/gi, '')
        .replace(/ /g, '-');
}

function getFileUrl(name) {
    return name ? '/uploads/images/' + name : '/images/noimage.png';
}

async function getCommonData() {
    const menus = await models.Menu.get(enums.Menu.Home);
    const data = await models.Information.get();
    const info = data[0];
    const guide = await models.Post.get({ category: enums.Post.advisory });
    const imageSliderHeader = await models.Slider.get({ category: enums.Slider.ImageHeader });

    const imageHeader = getFileUrl(imageSliderHeader[0].image);
    guide.map(item => {
        item.image = getFileUrl(item.image);
    });

    return {
        menus,
        info,
        guide,
        imageHeader
    };
}

module.exports = {
    getUrl,
    getFileUrl,
    getCommonData,
    ...require('./files')
}