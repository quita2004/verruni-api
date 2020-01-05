module.exports = (res, { data, message = '', success = false, code = 'NOT_FOUND' }) => {
    res.status(404).send({
        data,
        code,
        success,
        message
    })
};