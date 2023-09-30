//Create token and save in Cookie

export const sendJWToken = (user,statusCode,res) =>{
    const token = user.jwtToken()

    //Options for Cookie
    const options = {
        expires : new Date(
            Date.now() + process.env.COOKIE_EXPIRE_TIME * 24 *60*60*1000
        ),
        httpOnly:true
    }

    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        user,
        token
    })
}