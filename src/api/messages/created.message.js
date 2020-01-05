module.exports = (res, { data, message = '', success = true, code = 'SUCCESS' }) => {
    res.status(201).send({
        data,
        code,
        success,
        message
    })
};