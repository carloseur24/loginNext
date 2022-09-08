import prisma from "../../../lib/prisma"

// GET /api/filterPosts?searchString=:searchString
export default async function handle(req, res) {
  const searchString = req.query.id
  // const id = parseInt(searchString)
  const resultPosts = await prisma.post.findMany({
    where: {
      user: {
        email: {
          contains: searchString,
        },
      },
    },
  })
  if (resultPosts.length === 0) {
    res.json("")
  } else {
    res.json(resultPosts)
  }
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
