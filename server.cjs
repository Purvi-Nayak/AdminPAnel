// server.js
const jsonServer = require('json-server');
const path = require('path');
const authMiddleware = require('./middleware-auth.cjs'); // Your custom authentication middleware

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// Use default JSON Server middlewares (logger, static, etc.)
server.use(middlewares);

// Enable JSON body parsing for POST, PUT, PATCH requests
server.use(jsonServer.bodyParser);

// Custom authentication middleware should be used before the router
server.use(authMiddleware);

// Use JSON Server router for other resources
server.use(router);

// Start the server
server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000');
});