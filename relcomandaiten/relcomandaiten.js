const Sequelize  = require("sequelize");
const connection = require("../database/database");
const produtos = require('../produtos/produteModel');
const comanda = require('../comanda/comanda');

const relcomandaiten = connection.define('relcomandaiten', {
    quantidade:{
        type: Sequelize.FLOAT,
        alloNull: false
    }
})
relcomandaiten.belongsTo(produtos);
relcomandaiten.belongsTo(comanda);

relcomandaiten.sync()

module.exports = relcomandaiten;