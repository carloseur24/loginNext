import nodemailer from "nodemailer"
import { buildSendMail } from "mailing-core"

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use TLS
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
})

const sendMail = buildSendMail({
  transport,
  defaultFrom: "Carlos Test <carloseur24@gmail.com>",
})

export default sendMail
