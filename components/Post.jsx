import Router from "next/router";
import ReactMarkdown from "react-markdown";
import { BsFillEyeFill } from "react-icons/bs";

const Post = ({ post }) => {
  const authorName = post.name ? post.name : "Unknown author";
  return (
    <div
      className="div"
      onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
    >
      <div>
        <h2>{authorName}</h2>
        <small>{post.email}</small>
        <ReactMarkdown children={post.content} />
      </div>
      <BsFillEyeFill fontSize="3.5rem" />
      <style jsx>{`
        .div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: "roboto";
          font-weight: 300;
          color: inherit;
          padding: 3rem;
          padding-left: 4rem;
          padding-right: 4rem;
          background: rgba(0, 0, 0, 0.09);
        }

        h2 {
          font-weight: 400;
          text-transform: uppercase;
          color: black;
          margin-top: 0;
        }

        small {
          font-size: 25px;
        }

        div:hover {
          color: #227bbf;
        }
      `}</style>
    </div>
  );
};

export default Post;
