module.exports = function errorHandler(res, errorMessage) {
  res.status(500).json({
    message: errorMessage.message ? errorMessage.message : message
  });
};
