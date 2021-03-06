const dotenv = require('dotenv');
const dotenvOptions = process.env.NODE_ENV ? { path: `.env.${process.env.NODE_ENV}` } : { path: '.env' };
dotenv.config(dotenvOptions);

const config = {
    port: process.env.PORT,
    db: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DBNAME
    },
    secret: process.env.SECRET_KEY
};

module.exports = config;
