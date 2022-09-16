import Router from "next/router"
import { BsFillEyeFill } from "react-icons/bs"
//
const Post = ({ post }) => {
  // const authorName = post.name ? post.name : "Unknown author"
  return (
    <div className="flex justify-between items-center mb-10">
      {/* DATE */}
      <p className="basis-1/2 date text-gray-600  font-medium ">
        {post.createdAt}
        {/* id: {post.authorId} */}
      </p>
      {/* DATE */}

      {/* CONTENTS */}
      <div className="basis-1/2">
        <h2 className="title capitalize">{post.title}</h2>
        <a
          className="p-[4px] tag text-[0.7rem] font-medium uppercase bg-indigo-500 hover:bg-indigo-800 text-neutral-50 
        rounded-bl-lg border border-none px-2"
        >
          {post.content}
        </a>
      </div>
      {/* CONTENTS */}

      {/* VISUALIZE */}
      <button className="basis-1/2 grid justify-items-end tracking-tight transition duration-500 ease  select-none hover:text-indigo-600  focus:outline-none focus:shadow-outline">
        <BsFillEyeFill
          fontSize="2rem"
          onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
        />
      </button>
      {/* VISUALIZE */}
    </div>
  )
}

export default Post
