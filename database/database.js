const Sequelize = require("sequelize");
const connection  = new Sequelize('seccao7', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;