import { useRouter } from "next/router"
import Fonts from "./Fonts"
import Header from "./Header"

const Layout = (props) => {
  const router = useRouter()
  const isActive = (pathname) => router.pathname === pathname

  return (
    <div>
      <Fonts />
      {isActive("/") || isActive("/home") ? "" : <Header />}
      <div className="layout">{props.children}</div>
      <style jsx global>{`
        html {
          box-sizing: border-box;
        }

        *,
        *:before,
        *:after {
          box-sizing: inherit;
        }

        body {
          overflow: hidden;
          margin: 0;
          padding: 0;
          font-size: 16px;
          font-family: "Oswald", sans-serif, "Roboto", -apple-system,
            BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
            "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        }

        input,
        textarea {
          font-size: 16px;
        }

        button {
          cursor: pointer;
        }
      `}</style>

      <style jsx global>{`
        html {
          box-sizing: border-box;
        }

        *,
        *:before,
        *:after {
          box-sizing: inherit;
        }

         {
          /* body {
          background-image: radial-gradient(#0009ff5d 1px, transparent 1px),
            radial-gradient(#0009ff5d 1px, transparent 1px);
          background-position: 0 0, 25px 25px;
          background-size: 70px 70px;
        } */
        }
        .layout {
          overflow-y: auto;
        }
      `}</style>
    </div>
  )
}
export default Layout

// background-image:
//           radial-gradient(#09f 1px, transparent 1px),
//           radial-gradient(#09f 1px, transparent 1px);
//         background-position: 0 0, 25px 25px;
//         background-size: 70px 70px;
