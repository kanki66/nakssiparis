const http = require('http');
const app = require('./app')
const info = require('./info')

const port = process.env.PORT || info.constants.PORT_NUM;

const server = http.createServer(app);
server.listen(port);