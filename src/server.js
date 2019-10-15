import _ from 'lodash';
import express from 'express';
import path from 'path';
import chalk from 'chalk';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import load from 'express-load';
import mongoose from 'mongoose';
import passport from 'passport';
import versionCheck from './versionCheck';
// TODO: Enable to use session and bowser
// import session from 'express-session';
// import bowser from 'bowser';
// import _SessionConfig from './config/session';

/* Database Connection*/
import datastore from './config/datastore';

/* Auth */
import auth from './middlewares/Auth';

/* Routes */
import routers from './routes';

/* Create App */
const App = express();
global.App = App;

/* App Configuration */
global._ = _;

App.use(cors());

/* Database */
datastore.mongodb(mongoose);

App.use(express.static(path.join(__dirname, 'public')));

/* View engine setup */
App.set('views', path.join(__dirname, 'views'));
App.set("views", App.locals.viewsBase);
App.set('view engine', 'ejs');

// Utility function for obtaining embedded javascript templates
function fetch(file, locals, options) {
    if (locals !== null && typeof locals === "object") {
        if (options !== null && typeof options === "object") {
            options = mixin(locals, options);
        }
        else {
            options = locals;
        }
    }

    return ejs.render(fs.readFileSync(app.locals.viewsBase + "/" + file, "utf8"), options);
}

App.use(function (request, response, next) {
    response.setHeader('X-Powered-By', 'abc.com'); // FIX: Name
    response.setHeader('Content-Type', 'application/json');
    next();
});

App.use("*", function (req, res, next) {
    if (!res.locals) {
        res.locals = {};
    }

    // TODO: Add browser information
    // if(req.headers["user-agent"] && apiUtilities.isWebPage(req)) {
    // 	res.locals.bowser = bowser._detect(req.headers["user-agent"]);
    // 	res.locals.browserSupported = res.locals.bowser.a && (!res.locals.bowser.opera || (res.locals.bowser.opera && parseFloat(res.locals.bowser.version) >= 15.0));
    // }

    // Expose function for retrieving embedded javascript templates
    res.locals.fetch = fetch;

    next();
});

App.all("/*", function (req, res, next) {
    // Allow cross-origin api requests
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With, X-Auth-Token");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS");
    return next();
});

// Configure cookie parser
App.use(cookieParser());

// Configure body parser
App.use(bodyParser.json({ type: 'application/json' }));
App.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
App.use(bodyParser.text({ type: 'text/html' }));
App.use(bodyParser.json({ limit: 50000 }));
App.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
    console.log(chalk.green('\n-=-=-=-=-=-=-=-=-=-=- Development Environment -=-=-=-=-=-=-=-=-=-=-'));

    load('./models', { cwd: __dirname, verbose: true })
        .then('./config', { cwd: __dirname, verbose: true })
        .then('./constants', { cwd: __dirname, verbose: true })
        .then('./Utils', { cwd: __dirname, verbose: true })
        .into(App, (error, instance) => {
            (error) && console.log(chalk.red(`>> ${instance}`));

            /* Init Auth */
            auth(passport);
            App.use(passport.initialize());
            App.use(passport.session());

            global._mongo = instance.models;
            console.log(chalk.green('\n\u2713 Models Loaded'));

            global._config = instance.config;
            console.log(chalk.green('\u2713 Configurations Loaded'));

            global._constants = instance.constants;
            console.log(chalk.green('\u2713 Contants Loaded'));

            global._utils = instance.Utils;
            console.log(chalk.green('\u2713 Utils Loaded'));

            load('./middlewares', { cwd: __dirname, verbose: false }).into(App, (error, instance) => {
                global._middlewares = instance.middlewares;
                console.log(chalk.green('\u2713 Middlewares Loaded'));
            });

            load('./controllers', { cwd: __dirname, verbose: false }).into(App, (error, instance) => {
                global._controller = instance.controllers;
                console.log(chalk.green('\u2713 Controllers Loaded'));
            });

            /* Mount router to path */
            const ExpressRouter = express.Router();
            const router = routers(ExpressRouter);
            App.use('/:version/api?', versionCheck, router);

            console.log(chalk.green('\u2713 Routes Loaded'));

            var server = App.listen(process.env.APP_PORT, () => {
                var address = server.address().address;
                var port = server.address().port;

                console.log(chalk.blue(`\n>>> API listening at: http://${address.length == 0 || address == "::" || address == "0.0.0.0" ? "localhost" : address}:${port}/api`));

                return;
            });

        });

} else if (process.env.NODE_ENV === 'production') {
    console.log(chalk.green('\n-=-=-=-=-=-=-=-=-=-=- Production Environment -=-=-=-=-=-=-=-=-=-=-'));

}

// Handle invalid requests
App.use(function (req, res, next) {
    var error = new Error("Not Found");
    error.status = 404;
    next(error);
});

export default App;
