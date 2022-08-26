import { useEffect, useState } from "react"
import Router from "next/router"
import Image from "next/image"
import { BsGithub } from "react-icons/bs"
import Layout from "components/Layout"
import { loginWithGitHub, onAuthStateChange } from "../firebase/client"
import { USER_STATES } from "hooks/useUser"

const SignUp = () => {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    onAuthStateChange(setUser)
  }, [])

  useEffect(() => {
    user && Router.replace("/home")
  }, [user])

  const handleClick = () => {
    loginWithGitHub().catch((err) => console.log(err))
  }

  // const submitData = async (e) => {
  //   e.preventDefault()
  //   const body = { name, email }
  //   try {
  //     await fetch("/api/user", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(body),
  //     })
  //     console.log(email)
  //     Router.push("/home")
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
  const submitHome = async (e) => {
    e.preventDefault()
    Router.replace("/home")
  }
  return (
    <Layout>
      <div className="page">
        {user === USER_STATES.NOT_KNOWN ? (
          <Image
            src="/devter-logo.png"
            alt="Picture"
            layout="fixed"
            width="50px"
            height="50px"
          />
        ) : (
          <main>
            <form onSubmit={submitHome}>
              <div className="flex">
                <Image
                  src="/devter-logo.png"
                  alt="Picture"
                  layout="fixed"
                  width="50px"
                  height="50px"
                />
                <h1 style={{ textAlign: "center", marginTop: "0" }}>SignUp</h1>
              </div>
              <div>
                {user === USER_STATES.NOT_LOGGED && (
                  <button className="github" onClick={handleClick}>
                    <BsGithub fontSize="20px" />
                    LogIn with GitHub
                  </button>
                )}
                {/* {user && user.avatar && (
                <div className="flexProfile">
                  <img
                    className="img"
                    src={user.avatar}
                    width="50px"
                    height="50px"
                  />
                  <strong>{user.userName}</strong>
                </div>
              )} */}
              </div>
              <div>
                <button>LogIn with Google</button>
              </div>
              <input
                autoFocus
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                type="text"
                value={name}
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                type="text"
                value={email}
              />
              <input disabled={!name || !email} type="submit" value="SignUp" />
              {/* <a className="back" href="#" onClick={() => Router.push('/')}>
              Back Home
            </a> */}
            </form>
          </main>
        )}
      </div>
      <style jsx>{`
        .flex {
          display: flex;
          gap: 10px;
          justify-content: center;
        }

        .flexProfile {
          margin-top: 1em;
          margin-bottom: 1em;
          display: flex;
          gap: 5px;
          justify-content: center;
          align-items: center;
        }

        .img {
          border-radius: 50px;
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

        main {
          display: grid;
          place-items: center;
          padding: 3rem;
          background-color: #fff;
          height: 100%;
          width: 100%;
        }

        input[type="text"] {
          font-size: 15px;
          width: 100%;
          padding: 7px 10px;
          height: 42px;
          background: rgba(0, 0, 0, 0);
          margin: 0.5rem 0;
          border: 0;
          border-bottom: 0.125rem solid rgba(0, 0, 0, 0.2);
        }
        button {
          font-size: 15px;
          width: 100%;
          padding: 7px 10px;
          height: 42px;
          background: rgba(0, 0, 0, 0);
          margin: 0.5rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          font-size: 20px;
          background: #ececec;
          border: 0;
          margin-top: 2rem;
          padding: 1rem 1rem;
        }

        input[type="submit"]:hover {
          background: rgba(0, 0, 0, 0.09);
        }

        .github {
          display: flex;
          align-items: center;
          gap: 10px;
          justify-content: center;
          border: none;
          font-size: 15px;
          color: white;
          background: black;
        }

        .github:hover {
          background: #1d53b8;
        }

        @media (max-width: 550px) {
          .page {
            height: 100vh;
          }
          .github {
            background: black;
          }
        }
        @media (min-width: 550px) {
          main {
            padding-left: 5em;
            padding-right: 5em;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            height: 90vh;
            width: 550px;
          }
        }
      `}</style>
    </Layout>
  )
}

export default SignUp
