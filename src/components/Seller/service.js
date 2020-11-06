const mySql = require('../../config/connection').getInstance();
const { format: formatSql } = require('mysql');

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
    const query = `INSERT INTO sellers (firstname, lastname, password, email) VALUES ('${firstname}', '${lastname}', '${password}', '${email}');`;

    return mySql.query(query);
}

/**
 * @method findAll
 * @param {any}
 * @returns {any}
 */
function findAll() {
    const sql = 'SELECT * FROM sellers;';

    return mySql.query(sql);
}

/**
 * @method findById
 * @param {id}
 * @returns {any}
 */
function findById(id) {
    const idField = 'id';
    const query = `SELECT * FROM sellers WHERE ${idField} = ?`;
    const params = [id];

    return mySql.query(query, params);
}

module.exports = {
    create,
    findAll,
    findById
};
