//CÓDIGO PADRÃO PARA FUNCIONAMENTO DO APP

const express = require("express"); // importando o express
const app = express(); // iniciando o express 
const bodyParser = require("body-parser");
const porta = 4000;
const bd = false;
const fs = require('fs');
const connection = require("./database/database");
const slugify = require('slugify')
const BD = require('./models/allDatabase');
const cors = require('cors');
app.use(cors())
//const ip = require('ip')
//console.log(ip.address())

connection
    .authenticate()
    .then(()=>{
        console.log("conexão feita com sucesso");
    }).catch((error)=>{
        console.log(error);
    });



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.listen(porta, ()=>{console.log("rodando na porta: "+ porta)});
//FIM DO ESCOPO DE COMENTARIO

//ROTAS GETS
app.get('/', (req, res)=>{
    res.render('index', {
        msg: "hello Mundo"
    });
})

app.get('/fetch', (req, res) => {
    res.render("corpobranco");
})
//FIM
app.get('/getdados', (req, res) => {
    
    console.log("método get acionado.");
    res.json(json);
})
app.post('/enviardados', (req, res) =>{
    var dado = req.body;
    console.log("método post acionado. dado: " + JSON.stringify(dado));
    res.json(json);
})

var json = [
    {
        valor: 1,
        nome: "Marcio"
    },{
        valor: 2,
        nome: "Josi"
    }
]
//ROTAS NUAS
app.get('/getNewComanda', (req, res) =>{
    var formNewItem = {
        innerHeight: ''
    }
    fs.readFile('views/components/newcomanda.ejs','utf-8', (err, data)=>{
        console.log(data);

        formNewItem.innerHTML = data;
        res.json(formNewItem);
    })
})


//IMPORTANDO ROTAS CATEGORIES
const categoriesController = require("./categories/categoriesController");
app.use('/', categoriesController);

//IMPORTANDO ROTAS DE ARTIGOS
const articlesController = require("./articles/articlesController");
app.use('/', articlesController);

//IMPORTANDO ROTAS DE PRODUTOS
const produtesController = require("./produtos/produtosController")
app.use('/', produtesController);

//IMPORTANDO ROTAS DE CLIENTES
const clientescController = require('./clientes/clientescontroller');
app.use('/', clientescController)
//IMPORTANDO ROTAS DE COMANDA
const comandaController = require('./comanda/comandaController');
app.use('/', comandaController);
//const relcomandaiten = require('./relcomandaiten/relcomandaiten');
//IMPORTANDO ROTAS DE FORNECEDORES
const fornecedoresController = require('./fornecedores/fornecedoresController');
app.use('/', fornecedoresController)
//IMPORTANDO BD
/*
const clientesBD = require('./clientes/clientes');
const produtosBD = require("./produtos/produteModel");
const comanda = require('./comanda/comanda');*/
const articleBD = require('./articles/article');
const categoryBD = require('./categories/category');
console.log('PRODUTOS')
console.log(BD)