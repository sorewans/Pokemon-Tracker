const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalURL}`);
  res.status(404);
  next(error);
};

// Error handling middleware (must have all 4 arguments)
// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  const statusCode = res.StatusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};