import prisma from "../../lib/prisma"

// GET /api/filterPosts?searchString=:searchString
export default async function handle(req, res) {
  // const { searchString } = req.query
  const resultPosts = await prisma.user.findMany({})
  res.json(resultPosts)
}
// where: {
//   OR: [
//     {
//       title: { contains: searchString },
//     },
//     {
//       content: { contains: searchString },
//     },
//   ],
// },
