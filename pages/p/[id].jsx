import Layout from "../../components/Layout"
import Router from "next/router"
import { makeSerializable } from "../../lib/util"
import prisma from "../../lib/prisma"
import { MdDeleteForever } from "react-icons/md"

// async function publish(id) {
//   await fetch(`/api/publish/${id}`, {
//     method: "PUT",
//   })
//   await Router.push("/")
// }

async function destroy(id) {
  await fetch(`/api/post/${id}`, {
    method: "DELETE",
  })
  await Router.push("/")
}

const Post = (props) => {
  // if (!props.published) {
  //   title = `${title} (Draft)`
  // }
  const remember = (
    <h1 style={{ marginTop: "0", marginBottom: "2rem" }}>
      Remember #{props.id}
    </h1>
  )
  // console.log(props.feed.length)
  return (
    <Layout>
      <div className="page2">
        <div>{remember}</div>
      </div>
      <div className="page" key={props.id}>
        <div>
          <h2 className="title">{props.title}</h2>
          <small className="date">Date ( {props.createdAt} )</small>
          <small className="tag"> | TAG: {props.content} </small>
        </div>
        <div className="actions">
          {/* {!props.published && (
            <button onClick={() => publish(props.id)}>Publish</button>
          )} */}
          <button onClick={() => destroy(props.id)}>
            <MdDeleteForever fontSize={"3rem"} />
          </button>
        </div>
      </div>
      <style jsx>{`
        .page {
          margin-top: 1rem;
          margin-left: 20%;
          margin-right: 20%;
          display: flex;
          justify-content: space-between;
          padding: 3rem;
          transition: box-shadow 0.1s ease-in;
          background: rgba(0, 0, 0, 0.05);
        }

        .title {
          color: black;
        }
        .tag {
          color: black;
        }

        .page:hover {
          box-shadow: 1px 1px 3px #aaa;
          color: #227bbf;
        }

        .actions {
          margin-top: 2rem;
        }

        h2 {
          font-size: 25px;
          text-transform: uppercase;
        }
        small {
          text-transform: uppercase;
        }

        .page2 {
          margin-left: 25%;
          margin-right: 25%;
          display: flex;
          justify-content: center;
          justify-items: center;
          transition: box-shadow 0.1s ease-in;
        }

        button {
          background: rgba(0, 0, 0, 0);
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }
        button:hover {
          color: #e45e55;
        }
        button + button {
          margin-left: 1rem;
        }

        .button {
          text-decoration: none;
          color: black;
          transition: box-shadow 0.1s ease-in;
        }

        .button:hover {
          border-bottom: 3px solid #92140c;
        }

        small {
          font-size: 20px;
        }
      `}</style>
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  const post = await prisma.post.findUnique({
    where: { id: Number(context.params.id) },
  })
  return {
    props: makeSerializable(post),
  }
}

export default Post
