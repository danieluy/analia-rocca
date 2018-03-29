# Analia Rocca's Jewelry Website
## Config
### ``./config/index.js``
```javascript
const server = require('./server');
const auth = require('./auth');
module.exports = {
  siteName: 'Analia Rocca',
  server,
  auth
};
```
### ``./config/server.js``
```javascript
module.exports = {
  port: 3000
};
```
### ``./config/auth.js``
```javascript
module.exports = {
  tokenSecret: 'TOKEN_SECRET_GOES_HERE',
  allowedUsers: [
    {
      name: 'USER_NAME_GOES_HERE',
      email: 'USER_EMAIL_GOES_HERE',
      UID: 'UID_GOES_HERE'
    }, ...
  ]
};
```