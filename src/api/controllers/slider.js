const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const models = require('../../models');
const messages = require('../messages');
const { getFiles, saveFile, getExtensionName } = require('../../../common/files')
const common = require('../../../common');
const configs = require('../../config');
const enums = require('../../enums');

module.exports = {
    get: async (req, res) => {
        const id = req.params.id;
        const data = await models.Slider.get({ id });
        const dataRes = data[0];
        if (dataRes) {
            dataRes.image = common.getFileUrl(dataRes.image);
            messages.SuccessMessage(res, { data: dataRes });
            return;
        }

        messages.NotFoundMessage(res, {});
    },
    create: async (req, res) => {
        const data = await getFiles(req);
        const file = data.files.image;
        let filename = '';
        if (file) {
            filename = `${uuidv4()}.${getExtensionName(file.name)}`;
            await saveFile(file, configs.pathImageUpload + filename);
        }

        const entity = {
            title: data.fields.title,
            image: filename,
            category: enums.Slider.Home
        };

        await models.Slider.create(entity);

        messages.CreatedMessage(res, {
            message: 'Tạo thành công'
        });
    },
    update: async (req, res) => {
        const data = await getFiles(req);
        const file = data.files.image;
        const entity = {
            id: parseInt(data.fields.id),
            title: data.fields.title || '',
            category: enums.Slider.Home
        };

        let filename = '';
        if (file) {
            filename = `${uuidv4()}.${getExtensionName(file.name)}`;
            await saveFile(file, configs.pathImageUpload + filename);
            entity.image = filename;
        }

        await models.Slider.update(entity);

        messages.CreatedMessage(res, {
            message: 'Cập nhật thành công'
        });
    },
    delete: async (req, res) => {
        const id = req.params.id;
        if (id) {
            await models.Slider.delete(id);
        }

        messages.DeletedMessage(res, {
            message: 'Xóa thành công'
        })
    }
}