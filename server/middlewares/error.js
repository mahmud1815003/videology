const createError = require('http-errors');

const notFoundHandler = (req,res,next) => {
    const error = createError(404, "Your requested Resources are not found");
    next(error);
}

const errorHandler = (error,req,res,next) => {
    res.status(error.status).json({
        error: error.message,
    });
}

module.exports = {
    notFoundHandler,
    errorHandler,
}