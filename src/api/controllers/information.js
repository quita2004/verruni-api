const models = require('../../models');
const messages = require('../messages');

module.exports = {
    get: async(req, res)=>{
        const data = await models.Information.get();
        messages.SuccessMessage(res, {data: data[0]});
    }
}