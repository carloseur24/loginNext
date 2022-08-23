import { useRouter } from "next/router";
import Header from "./Header";

const Layout = (props) => {
  const router = useRouter();
  const isActive = (pathname) => router.pathname === pathname;

  return (
    <div>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;600&family=Roboto:wght@300;500&display=swap"
        rel="stylesheet"
      />
      {isActive("/") ? "" : <Header />}
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
          margin: 0;
          margin-bottom: 5rem;
          padding: 0;
          font-size: 16px;
          font-family: "Oswald", sans-serif, "Roboto", -apple-system,
            BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
            "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
          background-image: radial-gradient(#0009ff5d 1px, transparent 1px),
            radial-gradient(#0009ff5d 1px, transparent 1px);
          background-position: 0 0, 25px 25px;
          background-size: 70px 70px;
        }

        input,
        textarea {
          font-size: 16px;
        }

        button {
          cursor: pointer;
        }
      `}</style>
      <style jsx>{`
        .layout {
          padding: 0 2rem;
        }
      `}</style>
    </div>
  );
};
export default Layout;

// background-image:
//           radial-gradient(#09f 1px, transparent 1px),
//           radial-gradient(#09f 1px, transparent 1px);
//         background-position: 0 0, 25px 25px;
//         background-size: 70px 70px;
