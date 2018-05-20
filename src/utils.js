const handleBackendError = (err) => {
  const { status } = err;
  if (status && (status === 500 || status === 401 || status === 400))
    console.warn(err.status, err.response.body.message);
  else
    console.error(err);
};

/**
 * Fisher–Yates Shuffle
 * @param {Array} array
 */
const shuffleArray = (array) => {
  let m = array.length;
  let t;
  let i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
};

export {
  handleBackendError,
  shuffleArray
};
