const mySql = require('../../config/connection').getInstance();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

/**
 * @method getSomeData
 * @param {any}
 * @returns {any}
 */
function getAllUsers() {
    const sql = 'SELECT * FROM users;';

    return mySql.query(sql);
}

/**
 * @method findUserById
 * @param {uid}
 * @returns {any}
 */
function findUserById(uid) {
    const uniqueField = 'uid';
    const query = `SELECT * FROM users WHERE ${uniqueField} = ?`;
    const params = [uid];

    return mySql.query(query, params);
}

/**
 * @method findUserById
 * @param {uid}
 * @returns {any}
 */
function findUserByEmail(email) {
    const emailField = 'email';
    const query = `SELECT * FROM users WHERE ${emailField} = ?`;
    const params = [email];

    return mySql.query(query, params);
}

/**
 * @method findUserById
 * @param {uid}
 * @returns {any}
 */
function findUserByField(field, data) {
    const uniqueField = field;
    const query = `SELECT * FROM users WHERE ${uniqueField} = ?`;
    const params = [data];

    return mySql.query(query, params);
}

/**
 * @exports
 * @method create
 * @param {object} profile
 * @summary create a new user
 * @returns {Promise<ResultSetHeader>}
 */
function create({ username, password, email }) {
    const query = `INSERT INTO users (username, password, email) VALUES ('${username}', '${password}', '${email}');`;

    return mySql.query(query);
}

/**
 * Find a user by id and update his profile
 * @exports
 * @method updateById
 * @param {object} profile
 * @summary update a user's profile
 * @returns {Promise<ResultSetHeader>}
 */
function updateById(id, field, data) {
    const uniqueField = 'uid';
    const changedField = field;
    const query = `UPDATE users SET ${changedField} = ? WHERE ${uniqueField} = ?`;
    const params = [data, id];

    return mySql.query(query, params);
}

/**
 * @exports
 * @method deleteById
 * @param {string} id
 * @summary delete a user from database
 * @returns {Promise<ResultSetHeader}
 */
function deleteById(uid) {
    const uniqueField = 'uid';
    const query = `DELETE FROM users WHERE ${uniqueField} = ?`;
    const params = [uid];

    return mySql.query(query, params);
}

/**
 * @exports
 * @method decodeToken
 * @param {string} id
 * @summary delete a user from database
 * @returns {Promise<ResultSetHeader}
 */
function createRefreshToken(email) {
    return jwt.sign({
        maxAge: '7d',
        email
    }, 'secret');
}

/**
 * @exports
 * @method decodeToken
 * @param {string} id
 * @summary delete a user from database
 * @returns {Promise<ResultSetHeader}
 */
function createAccessToken(email) {
    return jwt.sign({
        maxAge: '60s',
        email
    }, 'secret');
}

/**
 * @exports
 * @method decodeToken
 * @param {string} id
 * @summary delete a user from database
 * @returns {Promise<ResultSetHeader}
 */
function decodeToken(token) {
    const verifiedToken = jwt.verify(token, 'secret');

    return verifiedToken.email;
}

/**
 * @exports
 * @method deleteById
 * @param {string} id
 * @summary delete a user from database
 * @returns {Promise<ResultSetHeader}
 */
function createEmailToken(email) {
    return jwt.sign({
        maxAge: Math.floor(Date.now() / 1000) + (60 * 60),
        email
    }, 'secret');
}

/**
 * @exports
 * @method deleteById
 * @param {string} id
 * @summary delete a user from database
 * @returns {Promise<ResultSetHeader}
 */
function sendEmailToken(email, emailToken) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: 'Company',
        to: email,
        subject: 'Complete your registrattion',
        text: 'Thanks for join our app, please, complete registration!',
        html: 'Hi! Thanks for join our app, please, complete registration! </br> <a href="'
            + 'http://localhost:3000/auth/verify/' + emailToken + '">Click here</a>'
    };

    transporter.sendMail(mailOptions);
}

module.exports = {
    getAllUsers,
    findUserById,
    create,
    updateById,
    deleteById,
    createEmailToken,
    sendEmailToken,
    findUserByEmail,
    decodeToken,
    findUserByField,
    createAccessToken,
    createRefreshToken
};
