/**
 * Arquivo: server.js
 * Descrição: 
 * Author: Andre Gros
 * Data de criação: 26/08/2018
*/

// Configurar o Setup da App:

//Chamada dos pacotes
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Teacher = require('./app/models/teacher');

mongoose.Promise = global.Promise;

//mongoDB local
//mongoose.conect('mongodb://localhost:27017/photocopy', {
//    useMongoClient:true
//});

// MLAB
mongoose.connect('mongodb://<gros>:<mongodb123>@ds031088.mlab.com:31088/teacher',{
    useNewUrlParser: true
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
    let teachers = new Teacher();
    teachers.matriculation = req.body.matriculation;
    teachers.name = req.body.name;
    teachers.save(function(error){
        if (error) {
            res.send('Erro ao salvar o professor' + error);
        } else {
            res.json({ message: 'Professor cadastrado com sucesso!' });
        }
    });
})

//Selecionar todos os professores (GET localhost:8080/api/teacher)
.get(function(req, res){
    Teacher.find(function(error, teachers){
        if(error)
            res.send('Erro ao tentar selecionar todos os professores...: ' + error);

        res.json(teachers);
    });
})

//Selecionar um professor pelo id (GET localhost:8080/api/teacher/{id})

router.route('teacher/:teacher_id')
.get(function (req, res){
    Teacher.findById(req.params.teacher_id, function(error, teachers){
        if(error)
            res.send('Id do professor não encrontrado....' + error);

        res.json(teachers);
    });
})

//atualizar um professor por id (PUT localhost:8080/api/teacher/{id})
.put(function(req, res){
    Teacher.findById(req.params.teacher_id, function(error, teacher){
        if(error)
            res.send("Id do professor não encontrado....: " + error);

            teacher.matriculation = req.body.matriculation;
            teacher.matriculation = req.body.name;

            teacher.save(function(error){
                if(error)
                    res.send('Erro ao atualizar o professor....: ' + error);
                res.json({ message: 'Professor atualizado com sucesso! ' });
            });
        });

    })

    //deletar um professor por id (DEL localhost:8080/api/teacher/{id})    
    .delete(function(req, res){
        Teacher.remove({
            _id: req.params.teacher_id
        }, function(error){
            if(error)
                res.send("Id do professor não encontrado....: " + error);
            res.json({ message: 'Professor excluido com sucesso! ' });
        });
    })

//Definindo um padrão das rotas prefixadas: /api
app.use('/api', router);

//Iniciando a aplicação (servidor)
app.listen(port);
console.log("Iniciando a app na porta " + port);