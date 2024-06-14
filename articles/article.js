const Sequelize  = require("sequelize");
const connection = require("../database/database");
const category = require("../categories/category")

const article = connection.define('article', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    }, 
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.STRING,
        allowNull: false
    }
})
//RELACIONAMENTOS
category.hasMany(article);
article.belongsTo(category);

article.sync()

module.exports = article;

