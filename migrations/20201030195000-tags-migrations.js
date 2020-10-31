const XLSX = require('xlsx');
const dataType = require('db-migrate-shared').dataType;

const tagsData = XLSX.readFile('tables/tags.xlsx');
const sheetNameListTags = tagsData.SheetNames;
const xlDataTags = XLSX.utils.sheet_to_json(tagsData.Sheets[sheetNameListTags[0]]);

module.exports = {
    async up(db) {
        await db.createTable('tags', {
            id: {
                type: dataType.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: dataType.STRING
            }
        });

        await xlDataTags.forEach((value) => {
            db.insert('tags', ['name'], [value.name]);
        });
    },

    async down(db) {
        await db.dropTable('tags');
    }
};
