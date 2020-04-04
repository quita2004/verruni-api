const models = require('../../models');
const messages = require('../messages');

module.exports = {
    get: async(req, res)=>{
        const data = await models.Information.get();
        messages.SuccessMessage(res, {data: data[0]});
    },
    update: async(req, res)=>{
        const {name, address, phone_1, phone_2, email, title} = req.body;
        const data = {};
        if(name){
            data.name = name;
        }
        if(address){
            data.address = address;
        }
        if(phone_1){
            data.phone_1 = phone_1;
        }
        if(phone_2){
            data.phone_2 = phone_2;
        }
        if(email){
            data.email = email;
        }
        if(title){
            data.title = title;
        }

        await models.Information.update(data);

        messages.SuccessMessage(res, {
            message: 'Cập nhật thành công'
        });
    }
}