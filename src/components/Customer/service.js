const mySql = require('../../config/connection').getInstance();

/**
 * @exports
 * @method create
 * @param {profile, tableField}
 * @summary create a new user
 * @returns {Promise<ResultSetHeader>}
 */
function create({
    firstname, lastname, email
}, password) {
    const query = `INSERT INTO customers (firstname, lastname, password, email, verify) VALUES ('${firstname}', '${lastname}', '${password}', '${email}', 0);`;

    return mySql.query(query);
}

/**
 * @method findById
 * @param {id}
 * @returns {any}
 */
function findById(id) {
    const idField = 'id';
    const query = `SELECT * FROM customers WHERE ${idField} = ?`;
    const params = [id];

    return mySql.query(query, params);
}

module.exports = {
    create,
    findById
};
