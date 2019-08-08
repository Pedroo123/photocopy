const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    code: {
        type: String,
        min: 0,
        required: true
    },
    name: {
        type: String,
        minlength: 1,
        maxlength: 80,
        required: true
    }
});

module.exports = mongoose.model('Course', courseSchema);