export const ErrorHandlerMid = (err,req,res,next) => {
    const message = err.message
    const status = err.statusCode

    res.status(status).json({
        success:false,
        message
    })
}