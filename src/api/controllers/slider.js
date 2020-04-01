const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const models = require('../../models');
const messages = require('../messages');
const { getFiles, saveFile, getExtensionName } = require('../../../common/files')
const configs = require('../../config');
const enums = require('../../enums');

module.exports = {
    get: async (req, res) => {
        const id = req.params.id;
        const data = await models.Slider.get(id);
        console.log("data", data)
        if (data.length > 0) {
            messages.SuccessMessage(res, { data: data[0] });
            return;
        }

        messages.NotFoundMessage(res, {});
    },
    create: async (req, res) => {
        const data = await getFiles(req);
        const file = data.files.image;
        const filename = `${uuidv4()}.${getExtensionName(file.name)}`;

        await saveFile(file, configs.pathImageUpload + filename);

        const entity = {
            title: data.fields.title,
            image: filename,
            category: enums.Slider.Home
        };

        models.Slider.create(entity);

        messages.CreatedMessage(res, {
            message: 'Tạo thành công'
        });
    }
}