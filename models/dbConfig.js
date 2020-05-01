const Sequelize = require('sequelize');
const sequelize = new Sequelize('DataDesk', 'sa', 'sa@123#', {
    host: 'localhost',
    dialect: 'mssql'
    // ,
    // operatorsAliases: false,
    // logging: false,
    // dialectOptions: {
    //     encrypt: false
    // }
});

const sql = require('mssql');
const locConfig = {
    user: 'sa',
    password: 'sa@123#',
    server: 'localhost',
    database: 'DataDesk',
    options: {
        encrypt: false
    }

};

// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('DataDesk', 'datadesk', 'DataDesk@123#', {
//     host: '164.100.140.101',
//     dialect: 'mssql'
// });

// const sql = require('mssql');
// const locConfig = {
//     user: 'datadesk',
//     password: 'DataDesk@123#',
//     server: '164.100.140.101',
//     database: 'DataDesk',
//     requestTimeout: 3600000,
//     options: {
//         encrypt: false
//     }
// };

sequelize
    .authenticate()
    .then(function success() {

    }).catch(function error(err) {
        console.log('Unable to connect to the database: ' + err);
    });

exports.sequelize = sequelize;
exports.sql = sql;
exports.locConfig = locConfig;