const server = require('./config/server')
require('./config/connection')
require('./config/routes')(server)