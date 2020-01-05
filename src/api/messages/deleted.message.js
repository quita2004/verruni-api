module.exports = (res, { data, message = '', success = true, code = 'DELETED_ACCEPTED' }) => {
    res.status(200).send({
        data,
        code,
        success,
        message
    })
};