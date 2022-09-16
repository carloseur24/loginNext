import { signOut, useSession } from "next-auth/react"
import Router, { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { makeSerializable } from "../lib/util"
import { AiOutlinePoweroff, AiOutlineHome } from "react-icons/ai"

// import Layout from "../components/Layout"
import prisma from "../lib/prisma"
import Image from "next/image"

const Draft = (props) => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const { data: session, status } = useSession()
  const authorEmail = session?.user?.email
  const router = useRouter()

  useEffect(() => {
    console.log(session?.user?.email)
    if (!session) {
      router.push({ pathname: "/login" })
    }
    return () => {}
  }, [])

  const submitData = async (e) => {
    e.preventDefault()
    try {
      const body = { title, content, authorEmail }
      await fetch(`/api/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      await Router.push("/")
    } catch (error) {
      console.error(error)
    }
  }
  if (status === "loading") return <p>Loading</p>
  if (session)
    return (
      // <Layout>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        <section className="flex h-screen flex-col">
          <header className="flex items-center justify-between py-10">
            {/* MAIN TITTLE */}
            <div className="flex">
              <div className="my-auto mx-2">
                <Image
                  src="/devter-logo.png"
                  alt="Picture"
                  layout="fixed"
                  width="35px"
                  height="35px"
                />
              </div>
              <a className="font text-2xl font-medium ">RecallMe</a>
            </div>
            {/* MAIN TITTLE */}

            {/* NAVBAR */}
            <div className="flex items-center text-base leading-5">
              <a
                className="anchor-home sm:p-4"
                onClick={() => Router.push("/")}
              >
                <a
                  className="flex font-medium p-1 items-center text-base"
                  href="/"
                >
                  <AiOutlineHome /> Home{" "}
                </a>
              </a>

              <button
                className="flex font-medium p-1 items-center text-base sm:p-4"
                onClick={() => signOut()}
              >
                <AiOutlinePoweroff />
                Logout
              </button>
            </div>
            {/* NAVBAR */}
          </header>

          {/* TITTLE */}
          <div className="flex justify-center my-4">
            <h1 className="text-xl font-semibold mx-4">Create Your Remember</h1>
          </div>
          {/* TITTLE */}

          {/* CONTENT */}
          <div className="grid ml-5 justify-center space-y-4">
            <div className="pt-5">
              <div>
                <div>
                  <label className="label text-lg" htmlFor="title">
                    Enter Name to Remember
                  </label>
                </div>

                <div className="px-2 py-3">
                  <input
                    id="title"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Remember"
                    type="text"
                    value={title}
                  />
                </div>
              </div>
            </div>

            <div className="pb-5">
              <div>
                <div>
                  <label className="label text-lg" htmlFor="content">
                    Input a Tag for Remember
                  </label>
                </div>

                <div className="px-2 py-3">
                  <input
                    id="content"
                    cols={50}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                    rows={1}
                    value={content}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* CONTENT */}

          {/* BUTTONS  */}
          <div className="flex flex-row justify-center space-x-8 mt-2">
            <form onSubmit={submitData}>
              <button
                className="w-full bg-indigo-400 text-white py-2 rounded-md font-semibold tracking-tight transition duration-500 ease 
              select-none hover:text-white hover:bg-indigo-600 focus:outline-none focus:shadow-outline px-6"
                disabled={!title || !content}
              >
                <a type="submit" value="Create" />
                Create
              </button>
            </form>

            <a className="back " href="#" onClick={() => Router.push("/")}>
              <button
                className="w-full bg-indigo-400 text-white py-2 rounded-md font-semibold tracking-tight transition duration-500 ease 
              select-none hover:text-white hover:bg-indigo-600 focus:outline-none focus:shadow-outline px-6"
              >
                Return
              </button>
            </a>
          </div>
          {/* BUTTONS  */}
        </section>
      </div>

      // </Layout>
    )
}

export const getServerSideProps = async () => {
  const feed = await prisma.user.findMany({})
  return {
    props: { post: makeSerializable(feed) },
  }
}

export default Draft
