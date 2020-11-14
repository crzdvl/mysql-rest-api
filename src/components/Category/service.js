const mySql = require('../../config/connection').getInstance();
// const { format: formatSql } = require('mysql');

/**
 * @exports
 * @method createCategory
 * @param {object} name
 * @summary create a new tag
 * @returns {Promise<ResultSetHeader>}
 */
function createCategory({ name }) {
    const query = `INSERT INTO categories (name) VALUES ('${name}');`;

    return mySql.query(query);
}

/**
 * @method getAllCategories
 * @param {any}
 * @returns {any}
 */
function getAllCategories() {
    const sql = 'SELECT * FROM tags;';

    return mySql.query(sql);
}

/**
 * @method findCategory
 * @param {id}
 * @returns {any}
 */
function findCategory(id) {
    const query = 'SELECT * FROM categories WHERE id = ?';
    const params = [id];

    return mySql.query(query, params);
}

module.exports = {
    getAllCategories,
    createCategory,
    findCategory
};
