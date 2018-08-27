/**
 * Arquivo: server.js
 * Descrição: 
 * Author: Andre Gros
 * Data de criação: 26/08/2017
 */

// Configurar o Setup da App:

//Chamada dos pacotes
var express = require('express')
var app = express();
var bodyParser = require('body-parser')

//Configuração da variavel app para usar o body-parse()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Definindo a porta onde sera executada a api
var port = process.env.port || 8000;

//Criando uma instancia das Rotas via Express
var router = express.Router();

//Rota exemplo
router.get('/', function(req, res){
    res.json({ message: 'teste get' })
});

//Definindo um padrão das rotas prefixadas: /api
app.use('/api', router);

//Iniciando a aplicação (servidor)
app.listen(port);
console.log("Iniciando a app na porta " + port);