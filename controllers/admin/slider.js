const db = require('../../src/loaders/db');

const tableName = 'slider';
module.exports = {
    get: async (req, res) => {
        const sliders = await db.select().from(tableName);
        console.log("sliders", sliders)

        res.render('admin/pages/slider', {
            sliders: sliders
        });
    }
}