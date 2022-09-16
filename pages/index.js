import { useEffect, useState } from "react"
import Router, { useRouter } from "next/router"
import { makeSerializable } from "lib/util"
import { AiOutlinePoweroff, AiOutlineHome } from "react-icons/ai"

import { signOut, useSession } from "next-auth/react"
import Post from "components/Post"
import Image from "next/image"

export default function HomePage(props) {
  const [data, setData] = useState("")
  const { data: session, status } = useSession()
  const router = useRouter()
  const dat = makeSerializable(data)

  // console.log(Object.values(dat))

  useEffect(() => {
    if (!session) {
      router.push({ pathname: "/login" })
    }
    return () => {}
  }, [])

  useEffect(() => {
    fetch(`/api/remember/${session?.user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
  }, [])

  if (status === "loading") return <p>Loading</p>
  if (session)
    return (
      <>
        <div>
          <div className="page mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
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
                  <div
                    className="anchor-home sm:p-4"
                    onClick={() => Router.push("/")}
                  >
                    <a
                      className="flex font-medium p-1 items-center text-base"
                      href="/"
                    >
                      <AiOutlineHome /> Home
                    </a>
                  </div>

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

              {/* AMOUNT */}
              <div className="text-base font-medium mb-5">
                <h1 className="text-indigo-500">Archived {dat.length}/5</h1>
              </div>

              {dat.length === 0 ? (
                <h2 className="font-bold my-5">
                  You Don&apos;t have anything Remember, you must create one to
                  show it here!
                </h2>
              ) : (
                Object.values(dat).map((post) => (
                  <div key={post.id} className="post">
                    <Post post={post} />
                  </div>
                ))
              )}
              {/* AMOUNT */}

              {/* CREATE */}
              <div className="flex justify-evenly items-center text-base leading-5 py-5">
                <nav>
                  {dat.length === 5 ? (
                    <div
                      className="rounded-lg bg-indigo-100 border-t-4 border-indigo-500 rounded-b text-indigo-900 px-4 py-3 shadow-md"
                      role="alert"
                    >
                      <div className="flex">
                        <div className="py-1">
                          <svg
                            className="fill-current h-6 w-6 text-indigo-500 mr-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path
                              d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 
                        8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
                            />
                          </svg>
                        </div>

                        <div>
                          <p className="font-bold">
                            You have exceeded the limit
                          </p>
                          <p className="text-sm">
                            Delete any remember to create other
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <a
                      className="anchor-create"
                      onClick={() => Router.push("/create")}
                    >
                      <button
                        className="w-full bg-indigo-400 text-white py-2 rounded-md font-semibold tracking-tight transition duration-500 ease 
                  select-none hover:text-white hover:bg-indigo-600 focus:outline-none focus:shadow-outline px-4"
                      >
                        Add Reminder
                      </button>
                    </a>
                  )}
                </nav>
              </div>
              {/* CREATE */}
            </section>
          </div>
        </div>
      </>
    )
}
