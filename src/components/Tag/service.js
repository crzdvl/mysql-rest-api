const mySql = require('../../config/connection').getInstance();
// const { format: formatSql } = require('mysql');

/**
 * @exports
 * @method createTag
 * @param {object} profile
 * @summary create a new tag
 * @returns {Promise<ResultSetHeader>}
 */
function createTag({ name }) {
    console.log(mySql);
    const query = `INSERT INTO tags (name) VALUES ('${name}');`;

    return mySql.query(query);
}

/**
 * @method getSomeData
 * @param {any}
 * @returns {any}
 */
function getAllTags() {
    const sql = 'SELECT * FROM tags;';

    return mySql.query(sql);
}

/**
 * @method findTag
 * @param {id}
 * @returns {any}
 */
function findTag(id) {
    const query = 'SELECT * FROM tags WHERE id = ?';
    const params = [id];

    return mySql.query(query, params);
}

module.exports = {
    createTag,
    getAllTags,
    findTag
};
