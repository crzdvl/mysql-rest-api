const XLSX = require('xlsx');

const dataType = require('db-migrate-shared').dataType;
const productsData = XLSX.readFile('db/tables/products.xlsx');
const sheetNameListProducts = productsData.SheetNames;
const xlDataProducts = XLSX.utils.sheet_to_json(productsData.Sheets[sheetNameListProducts[0]]);

module.exports = {
    async up(db) {
        await db.createTable('products', {
            id: {
                type: dataType.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: dataType.STRING
            },
            seller_id: {
                type: dataType.BIGINT
            },
            category_id: {
                type: dataType.BIGINT
            },
            price: {
                type: dataType.BIGINT
            }
        });
        /*
                let products = [];

        xlDataProducts.forEach((value) => {
            products.push({
                name: value.name,
                seller_id: value.seller_id,
                category_id: value.category_id,
                price: value.price
            });
        });

        let queryParams = [];
        const queryStringsArr = [];
        const queryTemplate = ' (?, ?, ?, ?)';

        products.forEach(({
            name, seller_id, category_id, price
        }) => {
            queryStringsArr.push(queryTemplate);
            queryParams = [...queryParams, name, seller_id, category_id, price];
        });

        const queryString = queryStringsArr.join(',');
        const values = formatSql(queryString, queryParams);
        console.log(values, queryString);
        db.insert('products', ['name', 'seller_id', 'category_id', 'price'], products);
        */

        await xlDataProducts.forEach((value) => {
            db.insert('products', ['name', 'seller_id', 'category_id', 'price'], [value.name, value.seller_id, value.category_id, value.price]);
        });
    },

    async down(db) {
        await db.dropTable('products');
    }
};
