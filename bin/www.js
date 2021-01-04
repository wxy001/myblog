//与server有关的
//引入http模块
const http = require('http');

const PORT = 8000
const serverHandle = require('../app');

const server = http.createServer(serverHandle);

server.listen(PORT, () => {
    console.log('listening on 8000 port');
});
