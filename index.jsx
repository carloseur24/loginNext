import Layout from "./components/Layout";
import Post from "./components/Post";
import { makeSerializable } from "./lib/util";
import prisma from "./lib/prisma";

const Blog = (props) => {
  console.log(props);
  return (
    <Layout>
      <div className="page">
        <h1>DashBoard</h1>
        <main>
          {props.feedUser.map((post) => (
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
          margin-left: 15%;
          margin-right: 15%;
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
          margin: 0;
          margin-bottom: 3rem;
          margin-left: 4%;
          font-family: "roboto";
          font-weight: 600;
          font-size: 4rem;
        }
      `}</style>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const feed = await prisma.post.findMany({
    include: { user: true },
  });
  const feedUser = await prisma.user.findMany({});
  return {
    props: {
      feed: makeSerializable(feed),
      feedUser: makeSerializable(feedUser),
    },
  };
};

export default Blog;
