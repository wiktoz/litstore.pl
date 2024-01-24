import nodemailer from 'nodemailer'

const mail = (from, to, subject, html) => {
    const message = {
        from: '"' + from + '"' + process.env.EMAIL_ADDRESS,
        to: to,
        subject: subject,
        html: html,
    };

    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
        },
    })

    return transporter.sendMail(message, (err, info) => {
        if (err) return err

        return info
    })
}

export default mail