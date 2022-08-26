import Layout from "../components/Layout"
import Post from "../components/Post"
import { makeSerializable } from "../lib/util"
import prisma from "../lib/prisma"

const Blog = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>DashBoard</h1>
        <main>
          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .page {
          margin-bottom: 50px;
        }

        .post {
          margin-left: 5%;
          margin-right: 5%;
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
        h1 {
          margin-left: 4%;
          font-family: "roboto";
          font-weight: 600;
          font-size: 4rem;
        }
      `}</style>
    </Layout>
  )
}

export const getServerSideProps = async () => {
  const feed = await prisma.post.findMany({
    include: { user: true },
  })
  return {
    props: { feed: makeSerializable(feed) },
  }
}

export default Blog
