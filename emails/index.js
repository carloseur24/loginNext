import nodemailer from "nodemailer"
import { buildSendMail } from "mailing-core"

const transport = nodemailer.createTransport({
  pool: true,
  host: "smtp.sendgrid.net",
  port: 465,
  secure: true, // use TLS
  auth: {
    user: "apikey",
    pass: process.env.PASS,
  },
})

const sendMail = buildSendMail({
  transport,
  defaultFrom: "Notificaciones Dvlance <notificaciones@dvlance.com>",
})

export default sendMail
