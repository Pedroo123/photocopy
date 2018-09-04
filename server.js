/**
 * Arquivo: server.js
 * Descrição: 
 * Author: Andre Gros
 * Data de criação: 26/08/2017
*/

// Configurar o Setup da App:

//Chamada dos pacotes
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Teacher = require('./app/models/teacher');

//mongoDB local
mongoose.conect('mongodb://localhost/photocopy', {
    useMongoClient:true
});

//Configuração da variavel app para usar o body-parse()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Definindo a porta onde sera executada a api
var port = process.env.port || 8000;

//Criando uma instancia das Rotas via Express=======

var router = express.Router();

router.use(function(req, res){
    console.log('Algo esta acontecendo aqui...');
    next();
});

//Rota exemplo
router.get('/', function(req, res){
    res.json({ message: 'teste get' })
});

//API's:=============================================

router.route('/teacher')

    .post(function(req, res){
        let teacher = new Teacher();

        teacher.matriculation = req.body.matriculation;
        teacher.name = req.body.name;

        teacher.save(function(error){
            if (error) {
                res.send('Erro ao salvar o professor' + error);
            } else {
                res.json({ message: 'Professor cadastrado com sucesso!' });
            }
        });
    });

//Definindo um padrão das rotas prefixadas: /api
app.use('/api', router);

//Iniciando a aplicação (servidor)
app.listen(port);
console.log("Iniciando a app na porta " + port);