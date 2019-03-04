const Teacher = require('../model/teacher');
const status = require("http-status");

exports.searchOne = (request, response, next) => {
    const id = request.params.id;
  
    Teacher.findById(id)
      .then(teacher => {
        if (teacher) {
          response.status(status.OK).send(teacher);
        } else {
          response.status(status.NOT_FOUND).send();
        }
      })
      .catch(error => next(error));
  };
  
  exports.searchAll = (request, response, next) => {
    let limite = parseInt(request.query.limite || 0);
    let pagina = parseInt(request.query.pagina || 0);
  
    if (!Number.isInteger(limite) || !Number.isInteger(pagina)) {
      response.status(status.BAD_REQUEST).send();
    }
  
    const ITENS_POR_PAGINA = 10;
  
    limite = limite > ITENS_POR_PAGINA || limite <= 0 ? ITENS_POR_PAGINA : limite;
    pagina = pagina <= 0 ? 0 : pagina * limite;
  
    Teacher.findAll({ limit: limite, offset: pagina })
      .then(teacher => {
        response.send(teacher);
      })
      .catch(error => next(error));
  };
  
  exports.create = (request, response, next) => {
    const matriculation = request.body.matriculation;
    const name = request.body.name;
  
    Teacher.create({
      matriculation: matriculation,
      name: name
    })
      .then(() => {
        response.status(status.CREATED).send();
      })
      .catch(error => next(error));
  };
  
  exports.updating = (request, response, next) => {
    const id = request.params.id;
  
    const matriculation = request.body.matriculation;
    const name = request.body.name;
  
    Teacher.findById(id)
      .then(teacher => {
        if (teacher) {
          Teacher.update(
            {
                matriculation: matriculation,
                name: name
            },
            { where: { id: id } }
          )
            .then(() => {
              response.status(status.OK).send();
            })
            .catch(error => next(error));
        } else {
          response.status(status.NOT_FOUND).send();
        }
      })
      .catch(error => next(error));
  };
  
  exports.delete = (request, response, next) => {
    const id = request.params.id;
  
    Teacher.findById(id)
      .then(teacher => {
        if (teacher) {
          Teacher.destroy({
            where: { id: id }
          })
            .then(() => {
              response.status(status.OK).send();
            })
            .catch(error => next(error));
        } else {
          response.status(status.NOT_FOUND).send();
        }
      })
      .catch(error => next(error));
  };  