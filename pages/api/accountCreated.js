import { NextApiResponse } from "next"
import sendMail from "../../emails"
import Welcome from "../../emails/Welcome"
// import AccountCreated from "../../emails/previews/AccountCreated"

export default async function handle(req, res = NextApiResponse) {
  sendMail({
    to: "carloseur24@gmail.com",
    subject: "Thanks you to Create a new account",
    cc: "tester+cc@example.com",
  bcc: ["tester+bcc@example.com", "tester+bcc2@example.com"],
    component: <Welcome name="carlos" />,
  })
  res.status(200).json({ name: "ready" })
}
