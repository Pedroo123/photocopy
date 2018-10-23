/**
 * Arquivo: server.js
 * Descrição: Modulo de professores
 * Author: Andre Gros
 * Data de criação: 29/08/2017
*/

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let teacherSchema = new Schema({
    matriculation: Number,
    name: String
});

module.exports = mongoose.model('Teacher', teacherSchema);