/**
 * Arquivo: server.js
 * Descrição: 
 * Author: Andre Gros
 * Data de criação: 26/08/2018
*/

//Chamada dos pacotes
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Teacher = require('./app/models/teacher');

mongoose.Promise = global.Promise;

// MLAB
mongoose.connect('mongodb://gros:mongo123@ds031088.mlab.com:31088/teacher',{ useNewUrlParser: true });

//Configuração da variavel app para usar o body-parse()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Definindo a porta onde sera executada a api
var port = process.env.port || 8000;

var router = express.Router();

router.use(function(req, res, next){
    console.log('Algo esta acontecendo aqui...');
    next();
});

router.route('/teacher')

    .post(function(req, res){
        let teacher = new Teacher();

        teacher.matriculation = req.body.matriculation;
        teacher.name = req.body.name;

        teacher.save(function(error){
            if (error) 
                res.send('Erro ao salvar o professor ' + error);

            res.json({ message: 'Professor cadastrado com sucesso!' });
        });
    })

    .get(function(req, res){
        Teacher.find(function(error, teacher){
            if(error)
                res.send('Erro ao tentar selecionar todos os professores...: ' + error);

            res.json(teacher);
        });
    })

router.route('teacher/:teacher_id')
    
    .get(function (req, res){
        Teacher.findById(req.params.teacher_id, function(error, teacher){
            if(error)
                res.send('Id do professor não encrontrado....' + error);

            res.json(teacher);
        });
    })

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
 
    .delete(function(req, res){
        Teacher.remove({
            _id: req.params.teacher_id
            }, function(error){
                if(error)
                    res.send("Id do professor não encontrado....: " + error);

                res.json({ message: 'Professor excluido com sucesso! ' });
            });
        });

//Definindo um padrão das rotas prefixadas: /api
app.use('/api', router);

//Iniciando a aplicação (servidor)
app.listen(port);
console.log("Iniciando a app na porta " + port);