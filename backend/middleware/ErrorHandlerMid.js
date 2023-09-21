export const ErrorHandlerMid = (err,req,res,next) => {
    const message = err.message || "Undefined Error Message"
    const status = err.statusCode || 500

    res.status(status).json({
        success:false,
        message
    })
}