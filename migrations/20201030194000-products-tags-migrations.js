const XLSX = require('xlsx');
const dataType = require('db-migrate-shared').dataType;

const tagsData = XLSX.readFile('tables/products_tags.xlsx');
const sheetNameListTags = tagsData.SheetNames;
const xlDataTags = XLSX.utils.sheet_to_json(tagsData.Sheets[sheetNameListTags[0]]);

module.exports = {
    async up(db) {
        await db.createTable('products_tags', {
            id: {
                type: dataType.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            product_id: {
                type: dataType.BIGINT
            },
            tag_id: {
                type: dataType.BIGINT
            }
        });

        await xlDataTags.forEach((value) => {
            db.insert('products_tags', ['product_id', 'tag_id'], [value.product_id, value.tag_id]);
        });
    },

    async down(db) {
        await db.dropTable('products_tags');
    }
};
