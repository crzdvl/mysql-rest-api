const mySql = require('../../config/connection').getInstance();

/**
 * @exports
 * @method create
 * @param {profile, tableField}
 * @summary create a new user
 * @returns {Promise<ResultSetHeader>}
 */
function create({
    firstname, lastname, password, email
}) {
    const query = `INSERT INTO customers (firstname, lastname, password, email) VALUES ('${firstname}', '${lastname}', '${password}', '${email}');`;

    return mySql.query(query);
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
function findUserByEmail(email) {
    const emailField = 'email';
    const query = `SELECT * FROM customers WHERE ${emailField} = ?`;
    const params = [email];

    return mySql.query(query, params);
}

module.exports = {
    create,
    updateById,
    findUserByField,
    findUserByEmail
};
