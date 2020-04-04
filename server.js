const express = require('express');
const config = require("./src/config");

const router = require("./src/routers");

const controllers = require('./controllers');
const adminRouter = require('./router/admin');

async function startServer() {
    const app = express();
    const engine = require('ejs-locals');
    const bodyParser = require('body-parser')

    app.use(bodyParser.json());       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }));

    app.use("/api", router);
    app.use(express.static(__dirname + '/public'));
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');


    app.engine('ejs', engine);
    app.get('/', controllers.index);
    app.use('/admin', adminRouter);

    app.use('/dich-vu', controllers.service);
    app.use('/thong-tin-tu-van', controllers.service);
    app.use('/ho-tro-ky-thuat', controllers.service);

    app.get('/:url', controllers.page);

    app.listen(config.port, err => {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        console.log(`Server listening on port ${config.port}`);
    });
}

startServer();