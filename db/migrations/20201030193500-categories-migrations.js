const XLSX = require('xlsx');
const dataType = require('db-migrate-shared').dataType;

const categoriesData = XLSX.readFile('db/tables/categories.xlsx');
const sheetNameListCategories = categoriesData.SheetNames;
const xlDataCategories = XLSX.utils.sheet_to_json(categoriesData.Sheets[sheetNameListCategories[0]]);

module.exports = {
    async up(db) {
        await db.createTable('categories', {
            id: {
                type: dataType.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: dataType.STRING
            }
        });

        await xlDataCategories.forEach((value) => {
            db.insert('categories', ['name'], [value.name]);
        });
    },

    async down(db) {
        await db.dropTable('categories');
    }
};
