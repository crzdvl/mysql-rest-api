const XLSX = require('xlsx');
const dataType = require('db-migrate-shared').dataType;

const sellersData = XLSX.readFile('db/tables/sellers.xlsx');
const sheetNameListSellers = sellersData.SheetNames;
const xlDataSellers = XLSX.utils.sheet_to_json(sellersData.Sheets[sheetNameListSellers[0]]);

module.exports = {
    async up(db) {
        await db.createTable('sellers', {
            id: {
                type: dataType.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            firstname: {
                type: dataType.STRING
            },
            lastname: {
                type: dataType.STRING
            },
            email: {
                type: dataType.STRING
            },
            password: {
                type: dataType.STRING
            },
            verify: {
                type: dataType.BOOLEAN
            }
        });

        await xlDataSellers.forEach((value) => {
            db.insert('sellers', ['firstname', 'lastname', 'password', 'email', 'verify'], [value.firstname, value.lastname, value.password, value.email, value.verify]);
        });
    },

    async down(db) {
        await db.dropTable('sellers');
    }
};
