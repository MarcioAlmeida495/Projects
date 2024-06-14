const Sequelize = require('sequelize');
const connection = require('../database/database');
const category = require('../categories/category');

const fornecedor = connection.define('fornecedores',{
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    phone:{
        type: Sequelize.STRING
    },
    observacao:{
        type: Sequelize.STRING
    }
})


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


//ABERTA, PIX, DINHEIRO, CARTAO 
const comandas = connection.define('comandas', {
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

comandas.belongsTo(cliente)

const produto = connection.define('produto', {
    name:{
        type: Sequelize.STRING,
        allowNull: false
    }, slug:{
        type: Sequelize.STRING,
        allowNull: false
    }, valorV:{
        type: Sequelize.FLOAT,
        allowNull: false
    }, valorC:{
        type: Sequelize.FLOAT,
        allowNull: false
    }, quantidade:{
        type: Sequelize.FLOAT,
        allowNull: false
    }
})
produto.belongsTo(category);

const comandaitens = connection.define('comandaitens',{
    quantidade: {
        type: Sequelize.FLOAT
    }
});

const fornecedoritens = connection.define('fornecedoritens', {
    vcompra: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
});

const moneycontrol = connection.define('moneycontrol', {
    vvalue:{
        type: Sequelize.FLOAT
    }
});

const billstoreceive = connection.define('billstoreceive', {
    vvalue:{
        type: Sequelize.FLOAT
    }
});
billstoreceive.belongsTo(cliente);

const pedido = connection.define('pedido', {});

pedido.belongsTo(fornecedoritens);
fornecedor.hasMany(pedido);

//produto.belongsToMany(fornecedor, {through: 'fornecedoritens'});
//fornecedor.belongsToMany(produto, {through: 'fornecedoritens'});
fornecedoritens.belongsTo(produto);
fornecedoritens.belongsTo(fornecedor);
fornecedor.hasMany(fornecedoritens);
produto.hasMany(fornecedoritens);

produto.belongsToMany(comandas, {through: 'comandaitens'});
comandas.belongsToMany(produto, {through: 'comandaitens'});
comandaitens.belongsTo(produto);
comandaitens.belongsTo(comandas);
comandas.hasMany(comandaitens);
produto.hasMany(comandaitens)



produto.sync()
cliente.sync()
comandas.sync()
comandaitens.sync()
fornecedor.sync();
fornecedoritens.sync();
billstoreceive.sync();
moneycontrol.sync();
//name, slug, valorV, valorC, categoryP

module.exports = {produto:produto, comandas:comandas, cliente:cliente, comandaitens: comandaitens, category: category, fornecedor: fornecedor, fornecedoritens: fornecedoritens};