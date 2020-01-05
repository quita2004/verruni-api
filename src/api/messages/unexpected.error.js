module.exports = (res, { data, message = '', success = true, code = 'UNEXPECTED' }) => {
    res.status(500).send({
        data,
        code,
        success,
        message
    })
};