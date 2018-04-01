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

const postCollection = ({ title, files }) =>
  new Promise((resolve, reject) => {
    const token = getToken();
    if (!token)
      return requestCanceled(reject, 'Request canceled for missing token');
    const req = request.post('/api/collection')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        if (err)
          reject(err);
        else
          resolve(res.body);
      });
  });

function addRecord(record, commisionId) {
  if (record.files)
    return new Promise((resolve, reject) => {
      const req = request.post('/api/record/')
      record.files.forEach((file) => {
        req.attach(file.name, file.pathOrBlob)
      })
      const recordWithoutFiles = Object.assign({}, record, { commisionId })
      delete recordWithoutFiles.files
      req.field('json', JSON.stringify(recordWithoutFiles))
      req.end((err, res) => {
        if (err)
          reject(err)
        else
          resolve(res.body)
      })
    })
  return Promise.reject(new Error('Files cannot be undefined'))
}

export {
  verifyGoogleId,
  getCollections,
  postCollection
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
