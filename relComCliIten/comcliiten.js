const Sequelize  = require("sequelize");
const connection = require("../database/database");

const comcliiten = connection.define('clientes', {
})

comcliiten.sync()

module.exports = comcliiten;