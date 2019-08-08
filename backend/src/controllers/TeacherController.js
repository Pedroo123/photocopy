const Teacher = require('../models/teacher');

module.exports = {

    //Busca os professores de forma assincrona e retornando num json
    async indiceProfessores(req, res) {
        const teachers = await Teacher.find().sort('-createdAt');

        return res.json(teachers);
    },

    //Metodo para fazer a criação do registro
    async storeTeacher(req, res) {
        
        //Desestruturando o Schema de professores
        const { matriculation, name} = req.body;

        const postTeachers = await Teacher.create({
            matriculation,
            name
        });

        return res.json(postTeachers);
    }

}