module.exports = (res, { data = null, message = '', success = false, code = 'NOT_FOUND' }) => {
    res.status(404).send({
        data,
        code,
        success,
        message
    })
};