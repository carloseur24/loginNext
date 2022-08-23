import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import prisma from "../lib/prisma";
import { makeSerializable } from "../lib/util";

const Draft = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");

  const data = [];
  // props.map(props => options.push(props.user.email))
  data.push(props.post);

  const submitData = async (e) => {
    e.preventDefault();
    try {
      const body = { title, content, authorEmail };
      await fetch(`/api/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Layout>
      <div className="page">
        <form onSubmit={submitData}>
          <h1 className="h1">Create Your Remember</h1>
          <div className="margin">
            <label className="label" htmlFor="title">
              Input Your Name
            </label>
            <input
              id="title"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Remember"
              type="text"
              value={title}
            />
          </div>
          <div className="margin">
            <label className="label" htmlFor="owner">
              Select Your Email
            </label>
            <select
              className="styles i"
              id="owner"
              onChange={(e) => setAuthorEmail(e.target.value)}
              placeholder="Author (email address)"
              name="owner"
              value={authorEmail}
            >
              <option value="" disabled>
                Select an Option
              </option>
              {data[0].map((props, idx) => (
                <option key={idx}>{props.email}</option>
              ))}
            </select>
          </div>
          <div className="margin">
            <label className="label" htmlFor="content">
              Input a tag for remember
            </label>
            <textarea
              id="content"
              cols={50}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
              rows={1}
              value={content}
            />
          </div>
          <input
            disabled={!content || !title || (!authorEmail && authorEmail)}
            type="submit"
            value="Create"
          />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            Back Home
          </a>
        </form>
      </div>
      <style jsx>
        {`
          .page {
            padding: 3rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: box-shadow 0.1s ease-in;
            border-bottom-right-radius: 10px;
            margin-left: 15%;
            margin-right: 15%;
          }

          input[type="text"],
          textarea {
            width: 100%;
            padding: 7px 10px;
            height: 42px;
            background: rgba(0, 0, 0, 0);
            margin: 0.5rem 0;
            border: 0;
            border-bottom: 0.125rem solid rgba(0, 0, 0, 0.2);
            font-family: "roboto";
            font-weight: 300;
          }
          input[type="text"]:hover,
          textarea:hover {
            background: #fff;
          }
          .styles {
            margin: 0.5rem 0;
            display: inline-block;
            width: 100%;
            padding: 7px 10px;
            height: 42px;
            outline: 0;
            border: 0;
            border-radius: 0;
            color: black;
            border: 0;
            position: relative;
            transition: all 0.25s ease;
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
          }
          select:hover {
            background: #fff;
          }

          select {
            background: rgba(0, 0, 0, 0);
            font-family: "roboto";
            font-weight: 300;
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
          }

          input[type="submit"] {
            background: #ececec;
            border: 0;
            padding: 1rem 2rem;
            font-family: "Roboto";
            font-weight: 300;
          }

          input[type="submit"]:hover {
            background: rgba(0, 0, 0, 0.05);
            cursor: pointer;
          }

          .back {
            color: black;
            text-decoration: none;
            margin-left: 1rem;
            background: #ececec;
            border: 0;
            padding: 1rem 1rem;
            font-family: "Roboto";
            font-weight: 300;
          }

          .back:hover {
            color: #92140c;
            background: rgba(0, 0, 0, 0.05);
            cursor: pointer;
          }

          .label {
            text-transform: Capitalize;
            padding-left: 3px;
            font-size: 22px;
            font-family: "Roboto";
            font-weight: 300;
          }

          option,
          select {
            font-size: 15px;
          }

          .h1 {
            text-transform: Capitalize;
            font-family: "oswald";
            font-weight: 500;
          }

          .margin {
            margin: 2rem;
            margin-left: 0.5rem;
            margin-right: 0.5rem;
          }
        `}
      </style>
    </Layout>
  );
};
export const getServerSideProps = async () => {
  const feed = await prisma.user.findMany({});
  return {
    props: { post: makeSerializable(feed) },
  };
};
export default Draft;
