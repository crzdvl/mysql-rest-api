const mySql = require('../../config/connection').getInstance();
const { format: formatSql } = require('mysql');
const _ = require('lodash');

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
 * @method findUserByEmail
 * @param {email, table}
 * @returns {any}
 */
function findUserByEmail(email) {
    const emailField = 'email';
    const query = `SELECT * FROM sellers WHERE ${emailField} = ?`;
    const params = [email];

    return mySql.query(query, params);
}

/**
 * @method getSomeData
 * @param {any}
 * @returns {any}
 */
function getAllProducts() {
    const sql = 'SELECT * FROM products;';

    return mySql.query(sql);
}

/**
 * @method getSomeData
 * @param {any}
 * @returns {any}
 */
function getSellerProducts(id) {
    const sql = `SELECT * FROM products WHERE seller_id=${id};`;

    return mySql.query(sql);
}

/**
 * @exports
 * @method createProduct
 * @param {object} profile
 * @summary create a new product
 * @returns {Promise<ResultSetHeader>}
 */
function createProduct(sellerId, { name }) {
    const query = `INSERT INTO products (seller_id, name) VALUES ('${sellerId}', '${name}');`;

    return mySql.query(query);
}

/**
 * @exports
 * @method intergrationProductsTags
 * @param {object} profile
 * @summary create a new product
 * @returns {Promise<ResultSetHeader>}
 */
function intergrationProductsTags(productId, productTags) {
    let queryParams = [];
    let values = [];
    let query = '';
    const queryStringsArr = [];
    const queryTemplate = ' (?, ?)';

    if (_.isArray(productTags)) {
        productTags.forEach(tagID => {
            queryStringsArr.push(queryTemplate);
            queryParams = [...queryParams, productId, tagID];
        });
        const queryString = queryStringsArr.join(',');
        values = formatSql(queryString, queryParams);

        query = `INSERT INTO products_tags (product_id, tag_id) VALUES ${values};`;
    }
    query = `INSERT INTO products_tags (product_id, tag_id) VALUES ('${productId}', '${productTags}');`;

    return mySql.query(query);
}

/**
 * @method findProduct
 * @param {id}
 * @returns {any}
 */
function findProduct(id) {
    const query = 'SELECT * FROM products WHERE id = ?';
    const params = [id];

    return mySql.query(query, params);
}

module.exports = {
    create,
    findUserByEmail,
    getAllProducts,
    getSellerProducts,
    createProduct,
    intergrationProductsTags,
    findProduct
};
