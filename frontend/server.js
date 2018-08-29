
const express = require('express');
const proxy = require('express-http-proxy');

const path = require('path');

const currentDirectory = __dirname;
console.log(__dirname);
console.log(path.join(__dirname, 'build'));
console.log(path.join(__dirname, '/build'));
console.log(path.join(__dirname, './build'));


const server = express();

server.use(express.static(path.join(__dirname, './build')));
server.get('/nais-test-frontend/health', (req, res) => res.sendStatus(200));

var apiProxy = proxy('/api', {target: 'http://nais-test/api'});
server.use(apiProxy);

server.listen(3000, '0.0.0.0', () => {
    console.log('Started')
});