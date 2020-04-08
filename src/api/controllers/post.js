const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const models = require('../../models');
const messages = require('../messages');
const configs = require('../../config');
const enums = require('../../enums');
const common = require('../../../common');

module.exports = {
    get: async (req, res) => {
        const id = req.params.id;
        const data = await models.Post.get({ id });
        const dataRes = data[0];
        if (dataRes) {
            dataRes.image = common.getFileUrl(dataRes.image);
            messages.SuccessMessage(res, { data: dataRes });
            return;
        }

        messages.NotFoundMessage(res, {});
    },
    create: async (req, res) => {
        const data = await common.getFiles(req);
        const file = data.files.image;
        let filename = '';
        if (file) {
            filename = `${uuidv4()}.${common.getExtensionName(file.name)}`;
            await common.saveFile(file, configs.pathImageUpload + filename);
        }

        const entity = {
            title: data.fields.title,
            image: filename,
            category: data.fields.category,
            description: data.fields.description,
            content: data.fields.content,
            url: common.getUrl(data.fields.title)
        };

        await models.Post.create(entity);

        messages.CreatedMessage(res, {
            message: 'Tạo thành công'
        });
    },
    update: async (req, res) => {
        const data = await common.getFiles(req);
        const file = data.files.image;
        const entity = {
            id: parseInt(data.fields.id),
            title: data.fields.title || '',
            category: parseInt(data.fields.category),
            content: data.fields.content,
            description: data.fields.description,
            url: common.getUrl(data.fields.title)
        };

        let filename = '';
        if (file) {
            filename = `${uuidv4()}.${common.getExtensionName(file.name)}`;
            await common.saveFile(file, configs.pathImageUpload + filename);
            entity.image = filename;
        }

        await models.Post.update(entity);

        messages.CreatedMessage(res, {
            message: 'Cập nhật thành công'
        });
    },
    delete: async (req, res) => {
        const id = req.params.id;
        if (id) {
            const post = await models.Post.delete(id);
            if (post.image) {
                common.deleteFile(configs.pathImageUpload + post.image);
            }
        }

        messages.DeletedMessage(res, {
            message: 'Xóa thành công'
        })
    }
}