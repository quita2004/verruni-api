const express = require('express');
const config = require("./src/config");

const router = require("./src/routers");

const controllers = require('./controllers');

async function startServer() {
    const app = express();
    const engine = require('ejs-locals');

    app.use("/api", router);
    app.use(express.static(__dirname + '/public'));
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');


    app.engine('ejs', engine);
    app.get('/', controllers.index);
    app.get('/admin', function(req, res) {
        res.render('admin/pages/index', { what: 'best', who: 'me' });
    });
    app.get('/admin/slider', function(req, res) {
        res.render('admin/pages/slider', { what: 'best', who: 'me' });
    });

    app.listen(config.port, err => {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        console.log(`Server listening on port ${config.port}`);
    });
}

startServer();