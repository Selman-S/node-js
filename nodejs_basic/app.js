var http = require('http');
const routesHandler = require('./routes')




var server = http.createServer(routesHandler)

server.listen(3000)
