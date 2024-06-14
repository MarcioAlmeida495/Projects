const Sequelize  = require("sequelize");
const connection = require("../database/database");
const comandas = require("../comanda/comanda")

const cliente = connection.define('clientes', {
    name:{
        type: Sequelize.STRING,
        allowNull: false
    }, 
    slug:{
        type: Sequelize.STRING,
        allowNull: true
    },
    address:{
        type: Sequelize.STRING,
        allowNull: true
    },
    cpf:{
        type: Sequelize.STRING,
        allowNull: true
    },
    phone:{
        type: Sequelize.STRING,
        allowNull: true
    }
})
cliente.sync()

module.exports = cliente;