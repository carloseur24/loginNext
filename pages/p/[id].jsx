import Layout from "../../components/Layout"
import Router from "next/router"
import { makeSerializable } from "../../lib/util"
import prisma from "../../lib/prisma"
import { MdDeleteForever } from "react-icons/md"

async function destroy(id) {
  await fetch(`/api/post/${id}`, {
    method: "DELETE",
  })
  await Router.push("/")
}

const Post = (props) => {
  const remember = (
    <h1 style={{ marginTop: "0", marginBottom: "2rem" }}>
      Remember #{props.id}
    </h1>
  )
  return (
    <Layout>
      <div className="page2">
        <div className="text-indigo-600 font-bold text-center pb-10">
          {remember}
        </div>
      </div>

      <div className="flex page justify-between" key={props.id}>
        <div>
          <h2 className="title font-semibold text-lg">{props.title}</h2>
          <small className="date">Date ( {props.createdAt} )</small>
          <small className="tag"> | Tag: {props.content} </small>
        </div>

        <div className="actions">
          <button
            className="mt-1 tracking-tight transition duration-500 ease  select-none hover:text-red-600  focus:outline-none focus:shadow-outline"
            onClick={() => destroy(props.id)}
          >
            <MdDeleteForever fontSize={"3rem"} />
          </button>
        </div>
      </div>
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
