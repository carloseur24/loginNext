import prisma from "../../lib/prisma"

// GET /api/filterPosts?searchString=:searchString
export default async function handle(req, res) {
  // const { searchString } = req.query
  const resultPosts = await prisma.post.findMany({
    where: {
      user: {
        email: {
          contains: req.body,
        },
      },
    },
  })
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
