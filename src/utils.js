const handleBackendError = (err) => {
  const { status } = err;
  if (status && (status === 500 || status === 401 || status === 400))
    console.warn(err.status, err.response.body.message);
  else
    console.error(err);
};

export { handleBackendError };
