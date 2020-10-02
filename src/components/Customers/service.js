const mySql = require('../../config/connection').getInstance();

/**
 * @method getSomeData
 * @param {any}
 * @returns {any}
 */
function getAllProducts() {
    const sql = 'SELECT * FROM products;';

    return mySql.query(sql);
}

module.exports = {
    getAllProducts
};
