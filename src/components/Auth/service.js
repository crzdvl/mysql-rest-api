const mySql = require('../../config/connection').getInstance();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

/*
const fs = require('fs');
const path = require('path');
console.log(__dirname, 'dirname');
const file = fs.readFileSync(path.resolve(__dirname, '../../views/letters/index.html'), { encoding: 'utf-8' });
*/

/**
 * @exports
 * @method create
 * @param {profile, tableField}
 * @summary create a new user
 * @returns {Promise<ResultSetHeader>}
 */
function create({
    firstname, lastname, password, email
}, tableField) {
    const query = `INSERT INTO ${tableField} (firstname, lastname, password, email) VALUES ('${firstname}', '${lastname}', '${password}', '${email}');`;

    return mySql.query(query);
}

/**
 * @exports
 * @method checkRole
 * @param {role}
 * @summary check user's role
 * @returns {Promise<Boolean}
 */
function checkRole(role) {
    if (role === 'customers' || role === 'sellers') {
        return true;
    }

    return false;
}

/**
 * Find a user by id and update his profile
 * @exports
 * @method updateById
 * @param {tableField, id, field, data}
 * @summary update a user's profile
 * @returns {Promise<ResultSetHeader>}
 */
function updateById(tableField, id, field, data) {
    const uniqueField = 'id';
    const changedField = field;
    const query = `UPDATE ${tableField} SET ${changedField} = ? WHERE ${uniqueField} = ?`;
    const params = [data, id];

    return mySql.query(query, params);
}

/**
 * @exports
 * @method decodeToken
 * @param {token}
 * @summary decode token
 * @returns {Promise<ResultSetHeader}
 */
function decodeToken(token) {
    const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);

    return verifiedToken;
}

/**
 * @exports
 * @method sendEmailToken
 * @param {email, emailToken}
 * @summary send email token
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
    console.log(__dirname, 'dirname');
    const mailOptions = {
        from: 'Company',
        to: email,
        subject: 'Complete your registrattion',
        text: 'Thanks for join our app, please, complete registration!',
        // html: file

        html: '<img src="https://image.winudf.com/v2/image/Y29tLmZ1bm55Y2F0Y29tcGlsYXRpb25fc2NyZWVuXzBfMTUxNzc2NDIzNl8wODA/screen-0.jpg?fakeurl=1&type=.jpg" alt="img" width="250px" />'
            + '</br> Hi! To complete your registration please, <a href="'
            + 'http://localhost:3000/auth/verify/' + emailToken + '">click here</a>'
    };

    transporter.sendMail(mailOptions);
}

/**
 * @method findUserByField
 * @param {tableField, field, data}
 * @returns {any}
 */
function findUserByField(tableField, field, data) {
    const uniqueField = field;
    const query = `SELECT * FROM ${tableField} WHERE ${uniqueField} = ?`;
    const params = [data];

    return mySql.query(query, params);
}

/**
 * @method findUserByEmail
 * @param {email, table}
 * @returns {any}
 */
function findUserByEmail(email, table) {
    const emailField = 'email';
    const tableField = table;
    const query = `SELECT * FROM ${tableField} WHERE ${emailField} = ?`;
    const params = [email];

    return mySql.query(query, params);
}

/**
 * @exports
 * @method createEmailToken
 * @param {email, role}
 * @summary create email token
 * @returns {Promise<ResultSetHeader}
 */
function createEmailToken(email, role) {
    return jwt.sign({
        maxAge: Math.floor(Date.now() / 1000) + (60 * 60),
        email,
        role
    }, process.env.SECRET_KEY);
}

/**
 * @exports
 * @method createAccessToken
 * @param {email, role}
 * @summary create access token
 * @returns {Promise<ResultSetHeader}
 */
function createAccessToken(id, email, role) {
    return jwt.sign({
        maxAge: '60s',
        id,
        email,
        role
    }, process.env.SECRET_KEY);
}

/**
 * @exports
 * @method createRefreshToken
 * @param {email, role}
 * @summary create refresh token
 * @returns {Promise<ResultSetHeader}
 */
function createRefreshToken(id, email, role) {
    return jwt.sign({
        maxAge: '7d',
        id,
        email,
        role
    }, process.env.SECRET_KEY);
}

module.exports = {
    create,
    checkRole,
    updateById,
    decodeToken,
    sendEmailToken,
    findUserByField,
    findUserByEmail,
    createEmailToken,
    createAccessToken,
    createRefreshToken
};
