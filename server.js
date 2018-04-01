const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');
const homeRouter = require('./routers/home');
const authRouter = require('./routers/auth');
const apiRouter = require('./routers/api');
const config = require('./config/');
const firebaseAdmin = require('./firebase');
// Locals
app.locals.firebaseAdmin = firebaseAdmin;
// Middleware
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bearerToken());
app.use('/auth', authRouter);
app.use('/api', apiRouter);
app.use('/', homeRouter);
// Init server
server.listen(config.server.port, () => {
  console.info(`Server listening on http://localhost:${config.server.port}`);
});
