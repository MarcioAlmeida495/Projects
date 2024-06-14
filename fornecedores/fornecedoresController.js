const express = require("express");
const router = express.Router();
const BD = require('../models/allDatabase')



router.get('/fornecedores', (req, res)=>{
    res.render('fornecedores', {clicked: 4})
})

router.post('/addfornecedor', (req, res)=>{
    console.log(req.body);
    var name = req.body.name;
    var tel = req.body.tel;
    var obs = req.body.obs;
    BD.fornecedor.create({name: name, phone: tel, observacao: obs}).then(r=>{
        res.json({msg: 'true'});

    })
})

router.get('/getallfornecedores', (req,res)=>{
    BD.fornecedor.findAll().then(r=>[
        res.json(r)
    ])
})
router.post('/findfornecedorbyid', (req, res)=>{
    BD.fornecedor.findAll({where:{id:req.body.id}}).then(r=>{
        res.json(r)
    })
})

router.post('/findfornecedoriten', (req, res)=>{
    var idfornecedor = req.body.idfornecedor;
    var idproduto = req.body.idproduto;
    console.log('PRODUTO'+idproduto);
    console.log('FORNECEDOR'+idfornecedor);
    BD.fornecedoritens.findAll({include:[{model: BD.fornecedor}, {model:BD.produto}], where:{fornecedoreId: idfornecedor, produtoId: idproduto}}).then(r=>{
        res.json(r);
    })
    BD.fornecedoritens.findAll({include:[{model:BD.produto}, {model:BD.fornecedor}]}).then(r=>{
        //res.json(r)
    })
})

router.post('/salvarpedido', (req, res)=>{
    var valores = req.body.valores;
    var produtos = req.body.produtos;
    var fornecedor = req.body.fornecedorid;
    console.log(valores);
    console.log(fornecedor);

    for(var i=0; i<valores.length; i++){
        BD.fornecedoritens.create({vcompra: valores[i], fornecedoreId: fornecedor, produtoId: produtos[i]});
        //BD.produto.findAll({})
    }
});

router.post('/finditenfornecedor', (req, res) =>{
    var iten = req.body.iten;
    BD.fornecedoritens.findAll({include:[{model: BD.fornecedor}, {model:BD.produto}], where:{produtoId: idproduto}}).then(r=>{
        res.json(r);
    });
})


module.exports = router; 