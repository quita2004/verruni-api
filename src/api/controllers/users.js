const models = require('../../models');
const messages = require('../messages');
module.exports = {
    getAll: async (req, res) => {
        const data = await models.Users.getAll();
        messages.CreatedMessage(res, {
            data
        })
    },
    get: async (req, res) => {
        const { id } = req.params;

        const data = await models.Users.get(id);
        messages.EnityMessage(res, { data });
    }
}