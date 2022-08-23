import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import Router from "next/router";
import { makeSerializable } from "../../lib/util";
import prisma from "../../lib/prisma";
import { MdDeleteForever } from "react-icons/md";
import Link from "next/link";
import { BsCalendar } from "react-icons/bs";
import { useState } from "react";

async function publish(id) {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/");
}

async function destroy(id) {
  await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });
  await Router.push("/");
}

const Post = (props) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  // if (!props.published) {
  //   title = `${title} (Draft)`
  // }
  const remember =
    props.feed.length === 0 ? (
      <Link href="/create">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            "align-items": "center",
          }}
        >
          <h1>
            You Don't have anything Remember, you must create one to show it
            here!
          </h1>
          <a
            style={{
              "text-decoration": "none",
              color: "black",
              "font-size": "3rem",
              padding: "2rem",
              backgroundColor: isHovering
                ? "rgba(0, 0, 0, 0.2)"
                : "rgba(0, 0, 0, 0.04)",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Create Remember
            <BsCalendar style={{ "margin-left": "0.5rem", color: "#381E80" }} />
          </a>
        </div>
      </Link>
    ) : (
      <h1 style={{ "margin-top": "0", "margin-bottom": "2rem" }}>
        {" "}
        Remembers{" "}
      </h1>
    );
  // console.log(props.feed.length)
  return (
    <Layout>
      <div className="page2">
        <div>{remember}</div>
      </div>
      {props.feed.map((props) => (
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
      ))}
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
  );
};

export const getServerSideProps = async (context) => {
  const post = await prisma.post.findMany({
    where: { authorId: Number(context.params.id) },
  });
  const user = await prisma.user.findUnique({
    where: { id: Number(context.params.id) },
  });
  return {
    props: { feed: makeSerializable(post), user: makeSerializable(user) },
  };
};

export default Post;
