const sequelize  = require("sequelize");
const connection = require("../database/database");
const cliente = require('../clientes/clientes');
const category = require('../categories/category')
const produto = require('../produtos/produteModel')



const comandas = connection.define('comandas', {
})
comandas.belongsTo(cliente)


comandas.sync();

module.exports = {comandas, produto};