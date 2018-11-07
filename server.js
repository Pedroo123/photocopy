var Teacher = require('./app/models/teacher');
var bodyParser = require('body-parser');
var port = process.env.port || 8000;
var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://gros:mongo123@ds045077.mlab.com:45077/projectphotocopy',{ useNewUrlParser: true });

router.use(function(req, res, next){
    console.log('Algo esta acontecendo aqui...');
    next();
});

router.route('/teachers')

    .post(function(req, res){
        let teacher = new Teacher();

        teacher.matriculation = req.body.matriculation;
        teacher.name = req.body.name;

        teacher.save(function(error){
            if (error) 
                res.status(422).send('Não foi possivel salvar o professor. ' + error);
                

            res.status(201).json({ id: teacher.id });
        });
    })

    .get(function(req, res){
        Teacher.find(function(error, teacher){
            if(error)
                res.send('Erro ao buscar os professores. ' + error);

            res.json(teacher);
        });
    })

router.route('/teachers/:teacher_id')
    
    .get(function (req, res){
        Teacher.findById(req.params.teacher_id, function(error, teacher){
            if(error || teacher == null)
                res.send(404, 'Professor não encontrado.');

            res.json(teacher);
        })
    })

    .put(function(req, res){
        Teacher.findById(req.params.teacher_id, function(error, teacher){
            if(error)
                res.send("Não foi possivel encontrar o id do professor. " + error);

                teacher.matriculation = req.body.matriculation;
                teacher.name = req.body.name;

                teacher.save(function(error){
                    if(error)
                        res.send('Não foi possivel atualizar o professor. ' + error);

                    res.status(200).json();
                });
            });
        })
 
    .delete(function(req, res){
        Teacher.remove({
            _id: req.params.teacher_id

        },function(error){
            if(error)
                res.send(404, 'Professor não encontrado.');
                
            res.json({ message: 'Professor excluido com sucesso!' });
        });
    });

app.use('/api', router);
app.listen(port);
console.log("Aplicação sendo iniciada na porta " + port);