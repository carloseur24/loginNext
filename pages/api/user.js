import prisma from "../../lib/prisma"

// POST /api/user
// Required fields in body: name, email
export default async function handle(req, res) {
  const { name, email } = req.body
  const result = await prisma.user.create({
    data: {
      name,
      email,
    },
  })
  res.json(result)
}
