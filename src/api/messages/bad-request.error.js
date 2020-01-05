module.exports = (res, { data, message = '', success = false, code = 'BAD_REQUEST' }) => {
    res.status(400).send({
        data,
        code,
        success,
        message
    })
};