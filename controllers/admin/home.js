const db = require('../../src/loaders/db');

module.exports = {
    get: async (req, res) => {
        res.render('admin/pages/index');
    }
}