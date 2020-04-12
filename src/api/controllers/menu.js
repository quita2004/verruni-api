const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const models = require('../../models');
const messages = require('../messages');
const common = require('../../../common');
const configs = require('../../config');
const enums = require('../../enums');

module.exports = {
    get: async (req, res) => {
        const id = req.params.id;
        const data = await models.Menu.get({ id });
        const dataRes = data[0];
        if (dataRes) {
            messages.SuccessMessage(res, { data: dataRes });
            return;
        }

        messages.NotFoundMessage(res, {});
    },
    create: async (req, res) => {
        const data = await common.getFiles(req);

        const entity = {
            post_id: data.fields.post_id,
            menu_category: enums.Menu.Home
        };

        await models.Menu.create(entity);

        messages.CreatedMessage(res, {
            message: 'Tạo thành công'
        });
    },
    update: async (req, res) => {
        const data = await common.getFiles(req);
        const entity = {
            id: parseInt(data.fields.id),
            post_id: data.fields.post_id,
            menu_category: enums.Menu.Home
        };

        await models.Menu.update(entity);

        messages.CreatedMessage(res, {
            message: 'Cập nhật thành công'
        });
    },
    delete: async (req, res) => {
        const id = req.params.id;
        if (id) {
            await models.Menu.delete(id);
        }

        messages.DeletedMessage(res, {
            message: 'Xóa thành công'
        })
    }
}