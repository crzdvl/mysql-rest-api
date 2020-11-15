const mySql = require('../../config/connection').getInstance();
const { format: formatSql } = require('mysql');
const _ = require('lodash');

/**
 * @method getAllProducts
 * @param {any}
 * @returns {any}
 */
function getAllProducts() {
    const sql = 'SELECT * FROM products;';

    return mySql.query(sql);
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
 * @method getOwnSellerProducts
 * @param {any}
 * @returns {any}
 */
function getOwnSellerProducts(id) {
    const sql = `SELECT * FROM products WHERE seller_id=${id};`;

    return mySql.query(sql);
}

/**
 * @method getSellerProducts
 * @param {id}
 * @returns {any}
 */
function getSellerProducts(id) {
    const sql = `SELECT products.id, 
                products.name,
                sellers.id,
                sellers.email
                FROM products
                INNER JOIN sellers ON products.seller_id = sellers.id
                WHERE products.seller_id = '${id}'`;

    return mySql.query(sql);
}

/**
 * @method getProductsByCategory
 * @param {categoryId}
 * @returns {any}
 */
function getProductsByCategory(categoryId) {
    const sql = `SELECT products.id, 
                products.name,
                categories.id,
                categories.name AS category
                FROM products
                INNER JOIN categories ON products.category_id = categories.id
                WHERE products.category_id = '${categoryId}'`;

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

/**
 * @method getProductsByTag
 * @param {id}
 * @returns {any}
 */
function getProductsByTag(tagId) {
    const query = `SELECT products.id,
                        products.name,
                        tags.name,
                        products_tags.product_id
                    FROM products_tags
                    INNER JOIN products ON products.id = products_tags.product_id
                    INNER JOIN tags ON tags.id = products_tags.tag_id
                    WHERE tags.id = '${tagId}'`;

    return mySql.query(query);
}

module.exports = {
    findUserByEmail,
    getAllProducts,
    getSellerProducts,
    createProduct,
    intergrationProductsTags,
    findProduct,
    getOwnSellerProducts,
    getProductsByTag,
    getProductsByCategory
};
