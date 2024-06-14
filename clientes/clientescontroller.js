const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const BD = require('../models/allDatabase')
const {Op} = require('sequelize')
router.get('/clientes', (req, res) =>{
    res.render('clientes.ejs')
})

router.post('/addCliente', (req, res) =>{
    console.log(req.body);
    var data = req.body;
    BD.cliente.create({name: data.nome, address: data.endereco, phone: data.phone, cpf: data.cpf}).then(r=>{
        BD.cliente.findAll().then(r=>{
            res.json(r);
        })
    });
})
router.get('/clientes/addNewClient', (req, res)=>{
    res.render('admin/clients/index.ejs');
})
router.get('/getClients', (req, res) =>{
    BD.cliente.findAll().then(r =>{
        res.json(r);
    })
})
router.post('/searchClients', (req, res) =>{
    var name = req.body.name;
    console.log(req.body)
    BD.cliente.findAll({
        where:{
            name:{
                [Op.like]: '%' + name + '%'
            } 
        }
    }).then(r=>{
        res.json(r)
    })
})


/*
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
}*/
module.exports = router;
