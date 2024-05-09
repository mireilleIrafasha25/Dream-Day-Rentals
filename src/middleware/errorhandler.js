/**
 * Error handling middleware function.
 *
 * @param {Error} err - The error object to be handled.
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {function} next  - The next middleware function in the stack.
 * 
 * @return {Object} -A json object containing the error details
 * 
 * @description This middleware function is responsible for handling errors that occur
 * during the execution of the application.
 * It extracts the error status code and message if available or defaults to 500 and Internal server error respectively.
 * If the application is running in a development environment,the stack trace of the error is also included in the response.
*/
const errorHandler=(err,req,res,next) => {
    const errstatus = err.status || 500;
    const errmessage = err.message || "Internal server error";
    res.status(errstatus).json({
        success:false,
        status:errstatus,
        message: errmessage,
        stack:process.env.NODE_ENV !== 'development'?err.stack :{}
    })
};
export default errorHandler;