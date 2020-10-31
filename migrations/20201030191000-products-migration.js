const XLSX = require('xlsx');
const dataType = require('db-migrate-shared').dataType;

const productsData = XLSX.readFile('tables/products.xlsx');
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
            }
        });

        await xlDataProducts.forEach((value) => {
            db.insert('products', ['name'], [value.name]);
        });
    },

    async down(db) {
        await db.dropTable('products');
    }
};
