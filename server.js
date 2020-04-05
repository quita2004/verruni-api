const express = require('express');
const config = require("./src/config");

const router = require("./src/routers");
const initPassport = require('./passport/init');

const controllers = require('./controllers');
const middleware = require('./src/routers/middleware');

async function startServer() {
    const app = express();
    const engine = require('ejs-locals');
    const bodyParser = require('body-parser');
    const cookieParser = require('cookie-parser');
    const passport = require('passport');
    const expressSession = require('express-session');
    const flash = require('connect-flash');

    app.use(bodyParser.json());       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }));
    app.use(cookieParser());
    app.use(expressSession({
        secret: 'mySecretKey',
        resave: false,
        saveUninitialized: true,
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(flash());

    initPassport(passport);
    const adminRouter = require('./router/admin')(passport);

    app.use("/api", middleware.isAuthenticated ,router);
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