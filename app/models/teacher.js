let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let teacherSchema = new Schema({
    matriculation: {
        type: Number
    },
    name: {
        type: String,
        minlength: 1,
        maxlength: 80,
        required: true
    }
});

module.exports = mongoose.model('Teacher', teacherSchema);