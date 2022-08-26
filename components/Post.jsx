import Router from "next/router"
import { BsFillEyeFill } from "react-icons/bs"

const Post = ({ post }) => {
  const authorName = post.name ? post.name : "Unknown author"
  return (
    <div
      className="div"
      onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
    >
      <div>
        <h2 className="title">{post.title}</h2>
        <p className="date">
          Date ( {post.createdAt} ) id: {post.authorId}
        </p>
        <p className="tag">
          TAG: {post.content} <BsFillEyeFill fontSize="3.5rem" />
        </p>
      </div>
      <style jsx>{`
        .tag {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .div {
          color: inherit;
          border-bottom: 1px solid #eee;
          margin-bottom: 10px;
          margin-left: 10px;
          margin-right: 10px;
        }

        h2 {
          font-size: 25px;
          font-weight: 400;
          text-transform: uppercase;
          color: black;
          margin-top: 0;
        }

        p {
          font-size: 20px;
        }

        div:hover {
          color: #227bbf;
        }

        @media (max-width: 550px) {
          h2 {
            font-size: 20px;
          }

          p {
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  )
}

export default Post
