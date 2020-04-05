const db = require('../../src/loaders/db');

module.exports = {
    get: async (req, res) => {
        
        console.log("req.isAuthenticated()", req.isAuthenticated())
        console.log("req.user", req.user)
        res.render('admin/pages/index');
    }
}