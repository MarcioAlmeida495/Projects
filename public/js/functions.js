function  myFetchPOST(url, init){
    fetch(url, init)
        .then(res => {
            res.json()
                .then(res => {
                    return res;
                })
        })
}
const sendData = () => {
    const url = document.getElementById('test').value;
    const dates = {
        url: url
    }
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dates)
    }
    //console.log(url);
    //console.(dates)
    return myFetchPOST(url, init);
}

var valor = '';

async function  myFetchPOST(url, init){
    fetch(url, init)
        .then(res => {
            res.json()
                .then(res => {
                    return res;
                })
        })
}
const sendDataProduto = (url =>{
    //console.log('sendData to : ');
    //console.log(url)
    const nameProduto = document.getElementById('nameProduto').value;
    const catProduto = document.getElementById('catProduto').value;
    const vvProduto = document.getElementById('vvProduto').value;
    const vcProduto = document.getElementById('vcProduto').value;
    const quantidade = document.getElementById('quantidade').value;
    
    const datas = {
        nameProduto: nameProduto,
        catProduto: catProduto,
        vvProduto: vvProduto,
        vcProduto: vcProduto,
        quantidade: quantidade    
    }
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datas)
    }
    //console.log(url);
    //console.log(datas)
    fetch(url, init)
        .then(res => {
            res.json()
                .then(res => {
                    //console.log('sendDataProduto')
                    //console.log(res)
                    searchincomponent('../getallitens', 'getComponents');
                    
                    return res;
                })
        })
})

const sendDataCat = (url =>{
    const nameCat = document.getElementById('nameCat').value;
    const catDesc = document.getElementById('catDesc').value;
    
    const datas = {
        nameCat: nameCat,
        catDesc: catDesc 
    }
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datas)
    }
    //console.log(url);
    //console.log(datas)
    myFetchPOST(url, init).then(r=>{
        valor = r;
    });
})

const esvaziaElemento = (element) => {
    const select = document.getElementById(element);
    select.innerHTML = '';
    //console.log('esvaziando');
}


function confirmEvent(event, form){
    event.preventDefault();
    var confirmation = confirm("Tem certeza disso?");
    if(confirmation){
        form.submit();
    }
}


async function searchClientsInNewSelect(event, url, select){
    
    if(event.keyCode == 13){
        var jsondata = {name: event.target.value}
        var init = initDataFormat(jsondata)
        fetch(url, init)
            .then(r=>{
                r.json()
                    .then(r=>{
                        //console.log(r)
                        //console.log(select)
                        document.getElementById(select).innerHTML = ''
                        r.forEach(client =>{
                            var newOption = document.createElement('option');
                            newOption.setAttribute('value', client.id)
                            newOption.innerHTML = client.name;
                            newOption.setAttribute('valueName', client.name);
                            document.getElementById(select).appendChild(newOption)
                        })
                    })
            })
    }
}

function searchincomponent(url, componente){
    var componente = document.getElementById(componente);
    var meio = ''
    var inicio = ''
    fetch(url).then(r => {
        var inicio = '<table class="table"><thead><tr><th>id</th><th>Produto</th><th>Slug</th><th>Valor de Venda</th><th>Valor de Compra</th><th>Ações</th></tr></thead><tbody>';
        
        r.json().then(r=>{
            //console.log(componente.innerHTML)
            r.forEach(r=>{
                meio = meio + '<tr><th>'+ r.id +'</th><th>'+ r.name +'</th><th>'+ r.slug +'</th><th>'+ r.valorV.toFixed(2) +'</th><th>'+ r.valorC.toFixed(2) +'</th><th><button class="btn btn2 colorY">Editar</button><button class="btn btn2 colorR">Excluir</button></th></tr>'  
                    
            })
            componente.innerHTML = inicio + meio + '</tbody></table>'
        })
    })
}
function initDataFormat(json){
    
    //console.log(data)
    
    return {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(json)
    }
}
//FUNCTION PARA ANALISAR FORM DA PAG /PRODUTOS/COMPONENTS/NEWITEM
function analyseFormNewItem(url){
    var valorv = document.getElementById('vvProduto').value.replaceAll(',','.');
    var valorC = document.getElementById('vcProduto').value.replaceAll(',','.');
    //console.log(valorC);
    //console.log(valorv)
    if(!isNaN(valorC) && !isNaN(valorv)){
        sendDataProduto(url);
    }else{
        if(isNaN(valorv))document.getElementById('vvProduto').style.border = "2px red solid";
        
        if(isNaN(valorC))document.getElementById('vcProduto').style.border = "2px red solid";
    }
}

function fetchinSelect(url, component){
    fetch(url).then(r=>{
        r.json().then(r=>{
            var innerhtml = ''
            //console.log(r);
            r.forEach(r=>{
                innerhtml = innerhtml + '<option value="'+ r.id +' " >'+ r.title +'</option>'
            })
            document.getElementById(component).innerHTML = innerhtml;
            //console.log('INNERHTMLasdjadjklasdjklasdjksdajk')
            //console.log(innerhtml)
            return innerhtml;
        })
    })
}

//FUNÇÕES PARA NEWCOMANDA
const range = 2;
const url = '/getitens/'
function searchKeyPressed(event, select, qtdid, valid, valtotal){
    //console.log(select)
    //console.log(qtdid)
    //console.log(valid)
    var valores = event.target.value;
    //console.log(valores.length)
    if(event.key==="Enter"){
        select.innerHTML = '';
        //console.log(event.key)
        fetch(url+valores)
            .then(r=>{
                r.json()
                    .then(r=>{
                        //console.log(r)
                        valid.value = parseFloat(r[0].valorV).toFixed(2); 
                        valtotal.value = parseFloat(r[0].valorV).toFixed(2);
                        r.forEach(r=>{
                            //console.log('VALORES CARREGADOS')
                            //console.log(r)
                            
                            var newoption = document.createElement('option');
                            newoption.setAttribute('value', r.valorV)
                            newoption.setAttribute('iid', r.id)
                            newoption.innerHTML = r.name;
                            select.appendChild(newoption);
                            qtdid.value = 1;
                            attTotal();
                        })
                    })
            })
    }
}

function operationQtd(event, valid, valtotal){
    //console.log(valtotal)
    //console.log('DENTRO DO OPERATIONQTD')
    //console.log(valid)
    var qtd = event.target.value;
    //console.log(valid)
    var auxx = event.target.getAttribute('iid');
    //console.log('VVENDA::::')
    //console.log(auxx)
    //console.log(valor);
    //console.log(valtotal.value)
    valtotal.value = parseFloat(qtd * valid.value).toFixed(2);
    attTotal();

}

//USADO EM NEWCOMANDA
function change(event, valid, valtotal, qtd){
    //console.log('NO CHANGE')
    //console.log(event.target.selectedOptions[0].getAttribute('iid'));
    //console.log(valid)
    valid.value = parseFloat(event.target.value).toFixed(2);
    //console.log(valid)
    valtotal.value = parseFloat(valid.value * qtd.value).toFixed(2)
    attTotal()
}

//ATUALIZAR TOTAL NA COMANDA


function attTotal(){
    var divItens =  document.getElementsByClassName('valTotal');
    divItens = [...divItens];
    //console.log(divItens);
    var total = 0.00;
    divItens.forEach(r=>{
        total += parseFloat(r.value);
    })
    
    document.getElementById('vTotal').innerHTML = 'Valor Total: R$' + total.toFixed(2);
    //console.log(total)
}

var aux = -1;
values = [];
function addNewItem(componente){
    event.preventDefault();
    var component = document.getElementById(componente)
    var values = document.getElementById(componente).getElementsByTagName('input');
    //console.log(values)
    values = [...values]
    //console.log(values)
    aux++;
    var html = document.getElementById(componente).innerHTML;
    //console.log(component.innerHTML)
    var newDiv = document.createElement('input');
    
    var selectid = 'select' + aux;
    var qtdid = 'qtd'+ aux;
    var valid = 'val'+aux;
    var valtotal = 'total'+aux;
    var newform = document.createElement('div');

    newform.setAttribute('class', 'formcad itens');
    newform.setAttribute('style', 'height: 80%; border: solid black 1px;')
    
    newDiv.setAttribute("class", 'full50');
    newDiv.setAttribute('style', 'width: 80%; margin: 0px;');
    newDiv.setAttribute("search", 'false');
    newDiv.setAttribute("id", 'name'+aux);
    newDiv.setAttribute("type", 'text');
    newDiv.setAttribute("placeholder", 'Pesquise o Item');
    newDiv.setAttribute("onkeypress", 'searchKeyPressed(event, '+selectid +','+ qtdid + ',' +valid + ','+ valtotal + ')');
    //console.log(component)
    //console.log(newDiv)
    newform.appendChild(newDiv);
    
    var newqtd = document.createElement('input');
    newqtd.setAttribute("id", 'qtd'+aux);
    newqtd.setAttribute("class", 'full15 dadoQtd myinput');
    newqtd.setAttribute('style', 'width: 50px');
    newqtd.setAttribute("type", 'number');
    newqtd.setAttribute("placeholder", 'Qtd Comprada');
    newqtd.setAttribute('onkeyup', 'operationQtd(event, '+ valid + ','+ valtotal +')');
    newform.appendChild(newqtd)

    var newselect = document.createElement('select');
    newselect.setAttribute('class','myselect dadoSelect');
    newselect.setAttribute('style', 'width: 50%;');
    newselect.setAttribute('id', selectid)
    newselect.setAttribute('onchange', 'change(event,'+ valid + ',' + valtotal +',' + qtdid +')');
    newform.appendChild(newselect);

    
    newform.append(' Unidade:')
    var valor = document.createElement('input');
    valor.setAttribute('class', 'myinput')
    valor.setAttribute('value', '0,00');
    valor.setAttribute('id', valid);
    valor.setAttribute('style', 'width: 10%;')
    newform.append(valor)
    
    newform.append('Total:')
    
    var valortotal = document.createElement('input');
    valortotal.setAttribute('class', 'valTotal myinput')
    valortotal.setAttribute('value', '0,00');
    valortotal.setAttribute('id', valtotal);
    valortotal.setAttribute('style', 'width: 10%;')
    newform.append(valortotal)

    var newvalor = document.createElement('div');

    component.prepend(newform)
    //console.log(html)
    //html += '<input class="full40" type="text" onkeypress="searchKeyPressed(event)" id="' + aux +'" placeholder="Defina o Item">';
    //html += '<input class="full20" type="number" onkeypress="searchKeyPressed(event)" id="qnt'+ aux +'" placeholder="Defina a Quantidade">'
    //document.getElementById(componente).innerHTML = html
}

function loadData(){
    var dadoSelect = [...document.getElementsByClassName('dadoSelect')];
    var dadoQtd = [...document.getElementsByClassName('dadoQtd')];
    var dado1 = [];

    for(var i = 0; i < dadoQtd.length; i++){
        var dado = {
            quantidade: dadoQtd[i].value,
            produtoId: dadoSelect[i].selectedOptions[0].getAttribute('iid')
        }
        //console.log(dado);
        dado1.push(dado);
        //console.log(dado1)
    }
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dado1)
    }

    myFetchPOST('/newComanda', init);
}