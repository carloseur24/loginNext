import { useEffect } from "react"
import Router from "next/router"
import Layout from "components/Layout"
import prisma from "lib/prisma"
import { data } from "../../firebase/client"
import useUser from "hooks/useUser"
import { makeSerializable } from "lib/util"
import Post from "components/Post"
import { HiHome } from "react-icons/hi"

export default function HomePage(props) {
  const user = useUser()
  console.log(user)
  useEffect(() => {
    data({ email: user?.email, name: user?.userName })
  }, [user])
  const avatar = user?.avatar
  
  
  return (
    <Layout>
      <div className="page">
        <section>
          <header className="flex">
            <a
              className="anchor-home"
              href="#"
              onClick={() => Router.push("/home")}
            >
              <h2>
                <HiHome />
                Home
              </h2>
            </a>
            <img
              className="img"
              src={avatar}
              alt="Picture"
              layout="fixed"
              width="50px"
              height="50px"
            />
          </header>

          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
          <nav>
            <a
              className="anchor-create"
              href="#"
              onClick={() => Router.push("/create")}
            >
              <h2>Create</h2>
            </a>
          </nav>
        </section>
      </div>
      <style jsx>
        {`
          .img {
            border-radius: 50px;
          }

          header {
            background: #ffffffee;
            backdrop-filter: blur(0.5px);
            text-align: center;
            align-items: center;
            height: 55px;
            position: sticky;
            top: 0;
            width: 100%;
            padding-top: 1rem;
            padding-bottom: 1rem;
            margin-bottom: 1rem;
            border-bottom: 1px solid #eee;
          }

          nav {
            text-align: center;
            background: white;
            height: 55px;
            width: 100%;
            border-top: 1px solid #eee;
            bottom: 0;
            padding-top: 1rem;
            padding-bottom: 1rem;
            position: sticky;
          }

          .page {
            margin-top: 2.4rem;
            margin-bottom: 2.4rem;
            font-size: 20px;
            font-family: "Roboto";
            font-weight: 300;
            background: white;
            display: flex;
            justify-content: center;
            background: rgba(0, 0, 0, 0);
          }

          .flex {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
          }

          section {
            display: grid;
            place-items: center;
            padding-bottom: 0;
            padding-top: 0;
            background-color: #ffffffee;
            height: 90vh;
            width: 100%;
            overflow-y: auto;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          }

          .anchor-create {
            color: black;
            text-decoration: none;
            border: 0;
            padding: 0;
            margin: 0;
          }
          .anchor-create:hover {
            background-color: black;
            text-decoration: none;
            border: 0;
            padding: 0;
            margin: 0;
          }

          .anchor-home {
            color: black;
            text-decoration: none;
            border: 0;
            padding: 0;
            margin: 0;
          }

          h2 {
            margin-left: 1rem;
            margin: 0;
            margin-bottom: 0;
          }

          @media (min-width: 550px) {
            section {
              height: 90vh;
              width: 900px;
            }
          }
        `}
      </style>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const post = await prisma.post.findMany({
    where: {
      user: {
        email: {
          contains: "carloseur@gmail.com",
        },
      },
    },
  })
  return {
    props: { feed: makeSerializable(post) },
  }
}
