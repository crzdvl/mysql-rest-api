const faker = require('faker');
const chalk = require('chalk');
const { format: formatSql } = require('mysql');
const mySql = require('../src/config/connection').getInstance();

/**
 * @method generatePeoples
 * @param {any}
 * @returns {any}
 */
function generatePeoples() {
    console.log('started generating peoples');

    let users = [];

    for (let i = 0; i <= 1000; i += 1) {
        let firstname = faker.name.firstName();
        let lastname = faker.name.lastName();
        let email = faker.internet.email();
        let password = faker.internet.password();
        let verify = faker.random.arrayElement([0, 1]);

        users.push({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            verify: verify
        });
    }

    console.log(chalk.bgGreen('finished generating peoples'));

    return users;
}

/**
 * @method addPeoplesInDB
 * @param {any}
 * @returns {any}
 */
function addPeoplesInDB(users) {
    console.log(chalk.inverse('started adding person in DB'));

    let queryParams = [];
    const queryStringsArr = [];
    const queryTemplate = ' (?, ?, ?, ?, ?)';

    users.forEach(({
        firstname, lastname, email, password, verify
    }) => {
        queryStringsArr.push(queryTemplate);
        queryParams = [...queryParams, firstname, lastname, email, password, verify];
    });

    const queryString = queryStringsArr.join(',');
    const values = formatSql(queryString, queryParams);
    const query = `INSERT INTO ${faker.random.arrayElement(['sellers', 'customers'])} (firstname, lastname, email, password, verify) VALUES ${values};`;
    mySql.query(query);

    console.log(chalk.bgGreen('finished adding part of person in DB'));
}

/**
 * @method generateProducts
 * @param {any}
 * @returns {any}
 */
function generateProducts() {
    console.log('started generating products');

    let products = [];

    for (let i = 0; i <= 1000; i += 1) {
        let name = faker.commerce.productName();
        let price = faker.commerce.price();

        products.push({
            name: name,
            price: price
        });
    }

    console.log(chalk.bgGreen('finished generating products'));

    return products;
}

/**
 * @method addProductsInDB
 * @param {any}
 * @returns {any}
 */
function addProductsInDB(products) {
    console.log(chalk.inverse('started adding products in DB'));

    let queryParams = [];
    const queryStringsArr = [];
    const queryTemplate = ' (?, ?)';

    products.forEach(({
        name, price
    }) => {
        queryStringsArr.push(queryTemplate);
        queryParams = [...queryParams, name, price];
    });

    const queryString = queryStringsArr.join(',');
    const values = formatSql(queryString, queryParams);
    const query = `INSERT INTO products (name, price) VALUES ${values};`;

    mySql.query(query);

    console.log(chalk.bgGreen('finished adding part of products in DB'));
}

/**
 * @method generateCategories
 * @param {any}
 * @returns {any}
 */
function generateCategories() {
    console.log('started generating categories');

    let products = [];

    for (let i = 0; i <= 45; i += 1) {
        let name = faker.commerce.productMaterial();

        products.push({
            name
        });
    }

    console.log(chalk.bgGreen('finished generating categories'));

    return products;
}

/**
 * @method addCategoriesInDB
 * @param {any}
 * @returns {any}
 */
function addCategoriesInDB(categories) {
    console.log(chalk.inverse('started adding categories in DB'));

    let queryParams = [];
    const queryStringsArr = [];
    const queryTemplate = ' (?)';

    categories.forEach(({
        name
    }) => {
        queryStringsArr.push(queryTemplate);
        queryParams = [...queryParams, name];
    });

    const queryString = queryStringsArr.join(',');
    const values = formatSql(queryString, queryParams);
    const query = `INSERT INTO categories (name) VALUES ${values};`;

    mySql.query(query);

    console.log(chalk.bgGreen('finished adding part of categories in DB'));
}

/**
 * @method generateTags
 * @param {any}
 * @returns {any}
 */
function generateTags() {
    console.log('started generating tags');

    let products = [];

    for (let i = 0; i <= 45; i += 1) {
        let name = faker.commerce.productAdjective();

        products.push({
            name
        });
    }

    console.log(chalk.bgGreen('finished generating tags'));

    return products;
}

/**
 * @method addTagsInDB
 * @param {any}
 * @returns {any}
 */
function addTagsInDB(categories) {
    console.log(chalk.inverse('started adding tags in DB'));

    let queryParams = [];
    const queryStringsArr = [];
    const queryTemplate = ' (?)';

    categories.forEach(({
        name
    }) => {
        queryStringsArr.push(queryTemplate);
        queryParams = [...queryParams, name];
    });

    const queryString = queryStringsArr.join(',');
    const values = formatSql(queryString, queryParams);
    const query = `INSERT INTO tags (name) VALUES ${values};`;

    mySql.query(query);

    console.log(chalk.bgGreen('finished adding part of tags in DB'));
}

/**
 * @method generateIntegrationsProductsTags
 * @param {any}
 * @returns {any}
 */
function generateIntegrationsProductsTags() {
    console.log('started generating tags and products integration');

    let products = [];

    for (let i = 0; i <= 45; i += 1) {
        let product_id = faker.random.number({
            min: 1,
            max: 45
        });

        let tag_id = faker.random.number({
            min: 1,
            max: 45
        });

        products.push({
            product_id,
            tag_id
        });
    }

    console.log(chalk.bgGreen('finished generating tags and products integration'));

    return products;
}

/**
 * @method addIntegrationsProductsTagsInDB
 * @param {any}
 * @returns {any}
 */
function addIntegrationsProductsTagsInDB(categories) {
    console.log(chalk.inverse('started adding tags and products integration  in DB'));

    let queryParams = [];
    const queryStringsArr = [];
    const queryTemplate = ' (?, ?)';

    categories.forEach(({
        product_id,
        tag_id
    }) => {
        queryStringsArr.push(queryTemplate);
        queryParams = [...queryParams, product_id, tag_id];
    });

    const queryString = queryStringsArr.join(',');
    const values = formatSql(queryString, queryParams);
    const query = `INSERT INTO products_tags (product_id, tag_id) VALUES ${values};`;

    mySql.query(query);

    console.log(chalk.bgGreen('finished adding part of tags and products integration in DB'));
}

module.exports = {
    generatePeoples,
    addPeoplesInDB,
    generateProducts,
    addProductsInDB,
    generateCategories,
    addCategoriesInDB,
    generateTags,
    addTagsInDB,
    generateIntegrationsProductsTags,
    addIntegrationsProductsTagsInDB
};
