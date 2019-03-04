const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://gros:mongo123@ds045077.mlab.com:45077/projectphotocopy',{ 
    useNewUrlParser: true 
});