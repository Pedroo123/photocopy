const express = require('express');
const TeacherController = require('../src/controllers/TeacherController');
const routes = express.Router();


//Middlewares para a ação relacionada aos professores
routes.post('/teachers', TeacherController.storeTeacher);
routes.get('/teachers', TeacherController.indiceProfessores);

//Middlewares para outras acoes em outros schemas (Curso, Disciplinas e etc);


module.exports = routes;