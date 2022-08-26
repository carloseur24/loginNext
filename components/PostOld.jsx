import Router from "next/router";
import ReactMarkdown from "react-markdown";

const Post = ({ post }) => {
  const authorName = post.user ? post.user.name : "Unknown author";
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown children={post.content} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
          background: rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </div>
  );
};

export default Post;
