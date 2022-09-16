// import { useRouter } from "next/router"
import Router, { useRouter } from "next/router"
import { AiOutlinePoweroff, AiOutlineHome } from "react-icons/ai"
import { signOut } from "next-auth/react"
import Image from "next/image"

const Layout = (props) => {
  // const router = useRouter()
  // const isActive = (pathname) => router.pathname === pathname

  return (
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
                  <AiOutlineHome /> Home{" "}
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

          <div className="layout">{props.children}</div>
        </section>
      </div>
    </div>
  )
}

export default Layout

// background-image:
//           radial-gradient(#09f 1px, transparent 1px),
//           radial-gradient(#09f 1px, transparent 1px);
//         background-position: 0 0, 25px 25px;
//         background-size: 70px 70px;
