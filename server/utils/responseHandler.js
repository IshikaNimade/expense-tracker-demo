const responseHandler = (res, status, message, data = null) => {
  if (status >= 400) {
    return res.status(status).json({ errors: data || [message] });
  }
  res.status(status).json({ message, data });
};

module.exports = responseHandler;
