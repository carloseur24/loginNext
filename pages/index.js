import { useEffect, useState } from "react"
import Router, { useRouter } from "next/router"
import { makeSerializable } from "lib/util"
import { HiHome } from "react-icons/hi"
import { signOut, useSession } from "next-auth/react"
import Post from "components/Post"
import { BsCalendar } from "react-icons/bs"

export default function HomePage(props) {
  const [data, setData] = useState("")
  const { data: session, status } = useSession()
  const router = useRouter()
  const dat = makeSerializable(data)

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
        <div className="page">
          <section>
            <header className="flex">
              <a className="anchor-home" onClick={() => Router.push("/")}>
                <h2>
                  <HiHome />
                  Home
                </h2>
              </a>
            </header>
            {dat.length === 0 ? (
              status === "loading" ? (
                <p>Loading</p>
              ) : (
                <div>
                  <h1>
                    You Don&apos;t have anything Remember, you must create one
                    to show it here!
                  </h1>
                  <a className="anchor">
                    Create Remember
                    <BsCalendar
                      style={{ marginLeft: "0.5rem", color: "#381E80" }}
                    />
                  </a>
                </div>
              )
            ) : (
              <h1>Remembers {dat.length}/5</h1>
            )}
            {dat.length === 0
              ? ""
              : data?.map((post) => (
                  <div key={post.id} className="post">
                    <Post post={post} />
                  </div>
                ))}
            <div>
              <button className="github" onClick={() => signOut()}>
                LOGOUT
              </button>
            </div>
            <nav>
              <a
                className="anchor-create"
                onClick={() => Router.push("/create")}
              >
                <h2>Create</h2>
              </a>
            </nav>
          </section>
        </div>
        <style jsx>
          {`
            .github {
              text-align: center;
              gap: 10px;
              justify-content: center;
              border: none;
              font-size: 15px;
              color: white;
              background: black;
              padding: 10px;
              margin-bottom: 10px;
            }

            .github:hover {
              background: #1d53b8;
            }

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

            .anchor {
              text-decoration: none;
              color: black;
              font-size: 3rem;
              padding: 2rem;
              background-color: rgba(0, 0, 0, 0.04);
            }
            .anchor:hover {
              background-color: rgba(0, 0, 0, 0.2);
            }

            @media (min-width: 550px) {
              section {
                height: 90vh;
                width: 900px;
              }
            }
          `}
        </style>
      </>
    )
}
