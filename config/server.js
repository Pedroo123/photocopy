const port = process.env.port || 8000;

const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, function() {
    console.log("Aplicação sendo iniciada na porta " + port);
})

module.exports = app