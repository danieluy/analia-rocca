const firebaseAdmin = require('firebase-admin');
const serviceAccount = require('./config/serviceAccountKey.json');
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: 'https://mywebsite-6b7fa.firebaseio.com'
});
module.exports = firebaseAdmin;
