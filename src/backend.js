import request from 'superagent';

const verifyGoogleId = idToken =>
  new Promise((resolve, reject) => {
    request.get(`/auth/verifygoogleid/${idToken}`)
      .end((err, res) => {
        if (err)
          reject(err);
        else
          resolve(res.body);
      });
  });

const getCollections = () =>
  new Promise((resolve, reject) => {
    const token = getToken();
    if (!token)
      return requestCanceled(reject, 'Request canceled for missing token');
    request.get('/api/collections')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        if (err)
          reject(err);
        else
          resolve(res.body);
      });
  });

const postDocuments = ({ files, filesInfo }) =>
  new Promise((resolve, reject) => {
    const token = getToken();
    if (!token)
      return requestCanceled(reject, 'Request canceled for missing token');
    const req = request.post('/api/collection')
      .set('Authorization', `Bearer ${token}`);
    files.forEach((file) => {
      req.attach(file.fieldName, file.pathOrBlob);
    });
    req.field('json', JSON.stringify(filesInfo));
    req.end((err, res) => {
      if (err)
        reject(err);
      else
        resolve(res.body);
    });
  });

export {
  verifyGoogleId,
  getCollections,
  postDocuments
};

function getToken() {
  const aRJWToken = JSON.parse(window.localStorage.getItem('AR_JWTOKEN'));
  return aRJWToken ? aRJWToken.token : null;
}

function requestCanceled(reject, message) {
  return reject({
    status: 400,
    response: { body: { message } }
  });
}
