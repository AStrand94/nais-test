const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');
const server = express();

server.use(express.static(path.join(__dirname, './build')));

server.get('/nais-test-frontend/health', (req, res) => res.sendStatus(200));

server.use(proxy('/api', {target: 'https://nais-test/'}));

server.listen(3000, '0.0.0.0', () => {
    console.log('Started')
});