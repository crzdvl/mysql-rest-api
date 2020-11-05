const XLSX = require('xlsx');
const dataType = require('db-migrate-shared').dataType;

const customersData = XLSX.readFile('db/tables/customers.xlsx');
const sheetNameListCustomers = customersData.SheetNames;
const xlDataCustomers = XLSX.utils.sheet_to_json(customersData.Sheets[sheetNameListCustomers[0]]);

module.exports = {
    async up(db) {
        await db.createTable('customers', {
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

        await xlDataCustomers.forEach((value) => {
            db.insert('customers', ['firstname', 'lastname', 'password', 'email', 'verify'], [value.firstname, value.lastname, value.password, value.email, value.verify]);
        });
    },

    async down(db) {
        await db.dropTable('customers');
    }
};
