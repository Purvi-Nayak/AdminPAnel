// server.js
const jsonServer = require('json-server');
const path = require('path');
const authMiddleware = require('./middleware-auth.cjs'); // Your custom authentication middleware

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(authMiddleware);
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000');
});