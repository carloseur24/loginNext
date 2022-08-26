import Link from "next/link"
import { useRouter } from "next/router"
import { HiHome } from "react-icons/hi"
import { BsCalendar } from "react-icons/bs"
import { GoSignIn } from "react-icons/go"
import { BiHomeHeart } from "react-icons/bi"

const Header = () => {
  const router = useRouter()

  const isActive = (pathname) => router.pathname === pathname

  return (
    <nav>
      <div className="left">
        <Link href="/">
          <a className="bold" data-active={isActive("/")}>
            {isActive("/") ? <BiHomeHeart /> : <HiHome />}
          </a>
        </Link>
        {/* <Link href="/drafts">
          <a data-active={isActive('/drafts')}>Drafts</a>
        </Link> */}
      </div>
      <div className="right">
        <Link href="/signup">
          {isActive("/") ? (
            <a className="button" data-active={isActive("/signup")}>
              <GoSignIn /> SignUp
            </a>
          ) : (
            ""
          )}
        </Link>
        {isActive("/") ? (
          <Link href="/create">
            <a className="button" data-active={isActive("/create")}>
              <BsCalendar color="381E80" /> Create Remember
            </a>
          </Link>
        ) : (
          ""
        )}
      </div>
      <style jsx>{`
        nav {
          display: flex;
          padding: 0.5rem;
          padding-bottom: 0rem;
          padding-left: 2.5rem;
          padding-right: 2.5rem;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.01);
          border-bottom: 1px solid rgba(0, 0, 0, 0.3);
          transition: box-shadow 0.1s ease-in;
          box-shadow: 1px 1px 3px #aaa;
          margin-bottom: 3rem;
        }

        .bold {
          transition: box-shadow 0.1s ease-in;
          font-size: 30px;
          font-weight: bold;
          margin-left: 5px;
          border-bottom: 3px solid rgba(0, 0, 0, 0);
        }
        .bold:hover {
          color: #92140c;
        }
        a {
          font-weight: 400;
          text-decoration: none;
          color: #000;
          display: inline-block;
          padding-right: 6px;
          border-bottom-right-radius: 5px;
          border-bottom: 1px solid rgba(0, 0, 0, 0);
        }

        .button {
          transition: box-shadow 0.1s ease-in;
        }
        .button:hover {
          border-bottom: 3px solid #92140c;
        }
        .left a[data-active="true"] {
          color: gray;
        }

        a + a {
          margin-left: 2rem;
        }

        .right {
          margin-left: auto;
        }

        .right a {
          font-size: 12px;
        }
      `}</style>
    </nav>
  )
}

export default Header
