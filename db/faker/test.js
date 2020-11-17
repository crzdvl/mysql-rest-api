const mySql = require('../../src/config/connection').getInstance();
const faker = require('faker');
const { format: formatSql } = require('mysql');

let users = [];

for (let i = 0; i <= 100; i += 1) {
    let firstname = faker.name.firstName();
    let lastname = faker.name.lastName();
    let email = faker.internet.email();
    let password = faker.internet.password();
    let verify = faker.random.arrayElement([0, 1]);

    users.push({
        firstname,
        lastname,
        email,
        password,
        verify
    });
}

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
