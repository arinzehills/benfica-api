
// utils/response.js

const successResponse = (res, message, data = {}) => {
    return res.json({
      success: true,
      message,
      data:data
    });
  };
  
  const errorResponse = (res, statusCode, message, data = {}) => {
    return res.status(statusCode??500).json({
      success: false,
      message,
      data:data
    });
  };
  
  module.exports=   {
    successResponse,
    errorResponse
  };
  