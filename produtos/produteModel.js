const sequelize = require('sequelize');
const connection = require('../database/database');
const category = require('../categories/category')
const comanda = require('../comanda/comanda');


const produto = connection.define('produto', {
    name:{
        type: sequelize.STRING,
        allowNull: false
    }, slug:{
        type: sequelize.STRING,
        allowNull: false
    }, valorV:{
        type: sequelize.FLOAT,
        allowNull: false
    }, valorC:{
        type: sequelize.FLOAT,
        allowNull: false
    }, quantidade:{
        type: sequelize.FLOAT,
        allowNull: false
    }
})
produto.belongsTo(category);
produto.sync()




//name, slug, valorV, valorC, categoryP

module.exports = produto;