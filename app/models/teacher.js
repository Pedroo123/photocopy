/**
 * Arquivo: server.js
 * Descrição: Modulo de orofessores
 * Author: Andre Gros
 * Data de criação: 29/08/2017
*/

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TeacherSchema = new Schema({
    matriculation: number,
    name: string
});

module.exports = mongoose.model('Teacher', TeachSchema);