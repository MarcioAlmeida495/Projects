const express = require("express");
const router = express.Router();
const BD = require('../models/allDatabase')
/*
const comandaBD = require('./comanda');
const clienteBD = require('../clientes/clientes');
const produtosBD = require('../produtos/produteModel');*/
//const relcomandaitenBD = require('../relcomandaiten/relcomandaiten');


getDate()

function getDate(){
    var date = new Date;
    var dia = date.getDate();
    if(dia<10){dia= '0'+dia};
    var ano = date.getFullYear();
    var mes = date.getMonth()+1;
    var horas = date.getHours();
    var minutos = date.getMinutes();
    if(horas<10) horas = '0'+horas;
    if(minutos<10) minutos = '0'+minutos;
    if(mes<10) {mes = '0'+mes};
    

    var formatdate = ano + '-' + mes + '-' + dia + ' -- ' + horas + ':' + minutos; 
    console.log(formatdate)
    return formatdate;
}

getDate()
router.post('/newComanda', (req, res) => {
    console.log(req.body);

    BD.comandas.create({
        clienteId: req.body.clientId,
        type: req.body.type,
        date: getDate()
    }).then((comand)=>{
        console.log(comand.id)
        req.body.data.forEach(r=>{
            BD.comandaitens.create({
                produtoId: r.produtoId,
                quantidade: r.quantidade,
                comandaId: comand.id
            }).then(()=>{console.log('inserido no comandaitens' + 'produtoId: '+ r.produtoId)})
            console.log('PROCURANDO PELO ID: ' + r.produtoId)
            BD.produto.findAll({attributes: ['quantidade', 'name'], where: {id:r.produtoId}}).then(result=>{
                
                var qtd = result[0].dataValues.quantidade - r.quantidade;
                //console.log('trocando resultado: ' + qtd + ' e ' + r.quantidade + ' e ' +  result[0].dataValues.quantidade )
                BD.produto.update({quantidade: qtd}, {where:{id:r.produtoId}}).then(()=>{
                    
                })

            })
            //BD.produto.update({quantidade: r.quantidade }, {where:{id:r.produtoId}})
        })
        res.json({msg: true})
    })

})

router.get('/comandas', (req, res) => {
    res.render('components/allComandas')
})
const { Op, Sequelize } = require('sequelize')
const { DataTypes } = require('sequelize');
router.post('/getAllComandas', (req, res) => {
    var clientid = parseInt(req.body.clientId);
    console.log(req.body)
    var filter;
    if(req.body.id != undefined){
        filter = {
            id : req.body.id
        }
    }else if(req.body.date != ''){
        filter = {
            type: {[Op.like]: '%' + req.body.type + '%' }, 
            date: {[Op.like]: '%' + req.body.date + '%' }
        }


    }else{
        filter = {
            type: {[Op.like]: '%' + req.body.type + '%' }
        }
    }
    
    if(clientid > 0){
        BD.comandas.findAll({ where:filter,
            include:[{model: BD.cliente, where:{id:  clientid}}, {model:BD.comandaitens, include:[{model:BD.produto}]}]
            }).then(comanda =>{
                //console.log(comanda)
                console.log('AQUI')
                res.json(comanda)
            })
    }
    else{
        BD.comandas.findAll({ where:filter,
            include:[{model: BD.cliente}, {model:BD.comandaitens, include:[{model:BD.produto}]}]
            }).then(comanda =>{
                //console.log(comanda)
                res.json(comanda)
            })
    }
    
    
})

router.post('/editComanda', (req,res)=>{
    console.log(req.body)
    req.body.datas.forEach(r=>{
        BD.comandaitens.create({
            produtoId: r.produtoId,
            quantidade: r.quantidade,
            comandaId: req.body.idcomanda
        }).then(()=>{
            res.json({msg:true})
        })
       
        //BD.produto.update({quantidade: r.quantidade }, {where:{id:r.produtoId}})
    })
})

router.post('/searchById', (req, res)=>{
    console.log(req.body)
    BD
})
module.exports = router;
