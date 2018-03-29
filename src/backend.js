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

export { verifyGoogleId };
