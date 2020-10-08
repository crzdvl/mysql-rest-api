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

module.exports = {
    createTag,
    getAllTags
};
