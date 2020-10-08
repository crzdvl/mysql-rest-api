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
    createProduct,
    intergrationProductsTags,
    create,
    findUserByEmail
};
