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
// Firebase
const firebaseAdmin = require('firebase-admin');
const serviceAccount = require('./config/serviceAccountKey.json');
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: 'https://mywebsite-6b7fa.firebaseio.com'
});
app.locals.firebaseAdmin = firebaseAdmin;
//  Public folder
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bearerToken());
app.use('/auth', authRouter);
app.use('/api', apiRouter);
app.use('/', homeRouter);
server.listen(config.server.port, () => {
  console.info(`Server listening on http://localhost:${config.server.port}`);
});
