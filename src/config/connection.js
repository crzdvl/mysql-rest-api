const mysql = require('mysql');
const util = require('util');
const { db } = require('./env');

class Connect {
    constructor() {
        this.connection = mysql.createPool({
            host: db.host,
            user: db.user,
            password: db.password,
            database: db.database
        });
    }

    static getInstance() {
        if (!this.connection) {
            this.connection = new Connect().connection;
        }

        this.connection.getConnection((err, connection) => {
            if (err) {
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.');
                }
                if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.');
                }
                if (err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.');
                }
                if (err.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
                    console.error('Query timedout, takin too much time');
                }
            }
            if (connection) connection.release();
        });

        this.connection.query = util.promisify(this.connection.query);
        return this.connection;
    }
}

module.exports = Connect;
