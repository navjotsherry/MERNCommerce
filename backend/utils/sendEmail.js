import nodemailer from 'nodemailer'

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        secure:true,
        auth:{
            user:process.env.MAIL_USERNAME,
            pass:process.env.MAIL_PASSWORD
        }
    })

    const mailOptions = {
        from:process.env.MAIL_USERNAME,
        to : options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(mailOptions)
}

export default sendEmail