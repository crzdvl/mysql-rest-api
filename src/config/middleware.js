const bodyParser = require('body-parser');
const compression = require('compression');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const { secret } = require('./env');
const path = require('path');

module.exports = {
    /**
     * @function
     * @description express middleware
     * @param {express.Application} app
     * @returns void
     */
    init(app) {
        // router in the javascript app can render the necessary components
        app.use(
            bodyParser.urlencoded({
                extended: false
            })
        );
        app.use(bodyParser.json());
        // parse Cookie header and populate req.cookies with an object keyed by the cookie names.
        app.use(cookieParser());
        // returns the compression middleware
        app.use(compression());
        // TODO
        app.use(
            session({
                secret,
                cookie: {
                    maxAge: 3600 * 24
                },
                resave: false,
                saveUninitialized: true
            })
        );
        // TODO
        app.use(flash());
        // helps you secure your Express apps by setting various HTTP headers
        app.use(helmet());
        // providing a Connect/Express middleware that
        // can be used to enable CORS with various options
        app.use(cors());
        // cors
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
            res.header('Access-Control-Allow-Credentials', '*');
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With,'
                + ' Content-Type, Accept,'
                + ' Authorization,'
                + ' Access-Control-Allow-Credentials'
            );
            next();
        });
    }
};
