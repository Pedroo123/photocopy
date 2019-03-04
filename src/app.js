const http = require("http");
const express = require("express");
const status = require("http-status");
//const bodyParser = require('body-parser');
const teacherRoute = require("./routes/teacher");

require("./database/connection");

const app = express();

app.use(express.json());

app.use("/api", teacherRoute);

app.use((request, response, next) => {
  response.status(status.NOT_FOUND).send();
});

//app.use((request, response, next) => {
//  response.status(status.CREATED).json({ id });
//});

app.use((error, request, response, next) => {
  response.status(status.INTERNAL_SERVER_ERROR).json({ error });
});

//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

const port = process.env.PORT || 8000;

app.set("port", port);

const server = http.createServer(app);

server.listen(port, function () {
  console.log("Aplicação sendo iniciada na porta " + port);
});