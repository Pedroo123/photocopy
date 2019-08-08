const Teacher = require('../app/models/teacher');
const express = require('express');

module.exports = function (server) {
    
    const router = express.Router();
    server.use('/api', router)
    
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
                if(error || teacher == null) {
                    res.send(404, 'Professor não encontrado.');
                } else {
                    res.json(teacher);
                }
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

}