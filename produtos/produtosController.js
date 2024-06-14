const express = require('express');
const router = express.Router();
const fs = require('fs');
//const Produte = require("./produteModel");
//const Category = require('../categories/category')
const slugify = require("slugify");
const BD = require('../models/allDatabase')
//const produto = require('./produteModel');

//const componente1 = fs.readFile();

router.get('/editor', (req, res) =>{
    res.render('../produtos/components/newItem');
 })

router.get("/newprodute", (req, res) =>{
    res.send('adicione um produto');
})

router.get("/searchProdute", (req, res) => {
    //res.send("digite o produto a ser procurado")
    res.render("index");
})

router.get("/admin/itens",(req, res) =>{
    res.render("corpobranco");
})
module.exports = router;

router.get('/admin/tags', (req, res) => {
    res.json(tags);
})

async function lerarquivo(url){
    fs.readFile(url, 'utf-8', (err, data) =>{
        console.log('no fs')
        console.log(data);
        return data;
    })
}

router.get('/newitem', (req, res) => {
    fs.readFile('produtos/components/newItem.ejs','utf-8', (err, data)=>{
        console.log(data);
        formNewItem.innerHTML = data;
        res.json(formNewItem);
    })
})
router.get('/newcat', (req, res) => {
    fs.readFile('produtos/components/newCat.ejs','utf-8', (err, data)=>{
        console.log(data);
        formNewItem.innerHTML = data;
        res.json(formNewItem);
    })
})

var formNewItem = {
    innerHTML: ""
}


router.post('/cadNewItem', (req, res) => {
    //console.log(req.body);
    var nameProduto = req.body.nameProduto;
    var catProduto = req.body.catProduto;
    console.log(catProduto)
    var vvProduto = req.body.vvProduto.replaceAll(',','.');
    var vcProduto = req.body.vcProduto.replaceAll(',','.');
    var quantidade = req.body.quantidade.replaceAll(',', '.');
    //name, slug, valorV, valorC, categoryP
    BD.produto.create({
        name: nameProduto,
        slug: slugify(nameProduto),
        valorV: vvProduto,
        valorC: vcProduto,
        categoryId: catProduto,
        quantidade: quantidade
    }).then(()=>{
        console.log('cadastrado')
        res.json(formNewItem)
        
    })
})
router.post('/product-delete', (req, res) => {
    var id = req.body.id;
    BD.produto.destroy({
        where:{
            id: id
        }
    }).then(()=>{
        res.json(formNewItem)
    })
})
const { Op } = require("sequelize");
const category = require('../categories/category');
router.get('/getitens/:item', (req, res) => {
    var itemname = req.params.item
    BD.produto.findAll({
        where:{
            name:{ 
            [Op.like]: '%' + itemname + '%'
            }
        }
    }).then(r=>{
        console.log(r)
        res.json(r)
    })
})
router.get('/getallitens', (req, res)=>{
    BD.produto.findAll({include:[{model: category}]}).then((produte)=>{
        console.log(produte)
        
        res.json(produte);
    })

})
router.post('/updateIten', (req,res)=>{
    var data = req.body;
    
    console.log('DENTRO DO UPDATEINTE')
    console.log(data);
    BD.produto.update({name: data.name, quantidade: data.quantidade, valorV: data.valorV, valorC: data.valorC, categoryId: data.categoria},{where: {id: data.id}}).then(r=>{
        
        BD.produto.findAll({include:[{model: category}], where: {id:data.id}}).then(r=>{
            res.json(r)
        })

    })

})
router.post('/searchItens', (req, res) =>{
    var name = req.body.name;
    var page = req.body.page;
    var pglimit = req.body.limit;
    console.log(page)
    console.log(name)
    pagelimit = pglimit;
    var filter;
    if(page){
        filter = {
            limit: pagelimit,
            offset: page*pagelimit,
            include: [{model: category}],
            where: {name: {[Op.like]: '%'+ name + '%'}}
        }
        console.log(page)
    }
    else {
        filter = {
            include: [{model: category}],
            where: {name: {[Op.like]: '%'+ name + '%'}}
        }
    }
    
    if(page != undefined)
    {
        BD.produto.findAndCountAll(
        {
            limit: pagelimit,
            offset: page*pagelimit,
            include: [{model: category}],
            where: {name: {[Op.like]: '%'+ name + '%'}}
        }
        ).then(r=>{
        //console.log(r)
        res.json(r)
    })}
    else {
        BD.produto.findAll(
            {
                include: [{model: category}],
                where: {name: {[Op.like]: '%'+ name + '%'}}
            }
            ).then(r=>{
            //console.log(r)
            res.json(r)
        })
    }
})