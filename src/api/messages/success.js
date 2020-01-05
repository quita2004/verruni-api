module.exports = (res, { data, message = '', success = true, code = 'SUCCESS' }) => {
    res.status(200).send({
        data,
        code,
        success,
        message
    })
};