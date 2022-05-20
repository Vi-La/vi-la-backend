// @ts-nocheck
const nodemailer = require("nodemailer")

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service:process.env.EMAIL_SERVICE,
    auth: {
      user:process.env.EMAIL_USERNAME,
      pass:process.env.EMAIL_PASSWORD
    },
  })

  const emailOptions = {
    from: "RCC Rwanda <jeancyifuzodamas@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  }
  await transporter.sendMail(emailOptions)
}

module.exports = sendEmail

