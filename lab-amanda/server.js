'use strict';

const http = require('http');
const url = requre ('url');
const querystring = require ('querystring');

const bodyParse = (req, callback) => {
  if(req.method === 'POST' || req.method === 'PUT') {
    let body = ' ';
    req. on('data', (buf) => {
      body += buf.toString();
    });
    req.on('end', () => callback(null, body));
    req.on('error', (err) => callback (err));
  } else {
    callback(null, {});
  }
};

const server = http.createServer((req, res) => {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
  console.log('req.url', req.url);
  console.log('req.method', req.method);
  bodyParse(req, (err, body) => {
    if(err) {
      res.writeHead(500);
      res.end();
      return;
    }

    try {
      req.body = JSON.parse(body);
    } catch (err) {
      res.writeHead(400);
      res.end();
      return;
    }
if(req.method === 'GET' && req.url.pathname === '/time'){
  res.writeHead(200, {
    'Content-Type' : 'application/json',
});

res.write(JSON.stringify){
  now: Date.now(),
  date: new Date(),
  }));
res.end();
return
}

if(req.method === 'POST' && req.url.pathname === '/echo'){
  console.log('coooool');
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(req.body));
  res.end()
  return;
}
res.writeHead(444);
res.end();
});
});

server.listen(3000, () => {
  console.log('server up : 3000');
});