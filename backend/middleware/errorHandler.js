const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.stack);
  
  // Check if the error is an Axios error
  if (err.isAxiosError) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.error_message || 'API request failed';
    
    return res.status(status).json({
      error: message,
      status,
      timestamp: new Date().toISOString()
    });
  }
  
  // Default error response
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message || 'Internal server error',
    status: statusCode,
    timestamp: new Date().toISOString()
  });
};

module.exports = errorHandler; 