const mySql = require('../../config/connection').getInstance();
const { format: formatSql } = require('mysql');

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
 * @exports
 * @method createProduct
 * @param {object} profile
 * @summary create a new product
 * @returns {Promise<ResultSetHeader>}
 */
function createProduct(sellerId, { name }) {
    const query = `INSERT INTO products (id_seller, name) VALUES ('${sellerId}', '${name}');`;

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
    const queryStringsArr = [];
    const queryTemplate = ' (?, ?)';

    productTags.forEach(tagID => {
        queryStringsArr.push(queryTemplate);
        queryParams = [...queryParams, productId, tagID];
    });

    const queryString = queryStringsArr.join(',');
    const values = formatSql(queryString, queryParams);
    const query = `INSERT INTO products_tags (id_product, id_tag) VALUES ${values};`;

    return mySql.query(query);
}

module.exports = {
    createTag,
    createProduct,
    intergrationProductsTags
};
