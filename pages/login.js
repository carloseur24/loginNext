import { signIn, useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { BsGithub } from "react-icons/bs"

const SignUp = () => {
  // const [name, setName] = useState("")
  // const [email, setEmail] = useState("")

  const { data: session, status } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (session) {
      router.push({ pathname: "/" })
    }
  }, [session])
  const submitData = async (e) => {
    e.preventDefault()
    try {
      // const body = { name, email }
      // await fetch(`/api/user`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(body),
      // })
    } catch (error) {
      console.error(error)
    }
  }
  if (status === "loading") return <p>Loading</p>
  if (!session)
    return (
      <div className="page">
        <main>
          <form onSubmit={submitData}>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <div className="bg-white py-6 rounded-md px-10 max-w-lg shadow-md">
                {/* SIGN UP */}
                <div className="flex justify-center text-2xl font-semibold mx-20">
                  <div className="my-auto mx-2">
                    <Image
                      src="/devter-logo.png"
                      alt="Picture"
                      layout="fixed"
                      width="50px"
                      height="50px"
                    />
                  </div>

                  <h1 className="text-center my-auto text-3xl font-bold text-black-500 mb-4">
                    Sign up
                  </h1>
                </div>
                {/* SIGN UP */}

                {/* ACCESS BUTTONS */}
                <div className="flex my-4 justify-around">
                  <button
                    className="border border-stone-900 font-mono text-sm rounded-md tracking-tight py-2 px-2 flex mx-2 
              items-center text-center transition duration-500 ease select-none hover:text-white hover:bg-stone-600 
              focus:outline-none focus:shadow-outline"
                    onClick={() => signIn()}
                  >
                    <BsGithub fontSize="20px" /> Log In With Github
                  </button>

                  <button
                    className="border border-stone-900 font-mono text-sm 
              rounded-md tracking-tight py-2 px-2 flex mx-2 items-center text-center transition duration-500 ease select-none 
              hover:text-white hover:bg-sky-600 focus:outline-none focus:shadow-outline"
                  >
                    <Image
                      src="/google-icon.png"
                      alt="Picture"
                      layout="fixed"
                      width="20px"
                      height="20px"
                    />{" "}
                    Log In With Google
                  </button>
                </div>
                {/* ACCESS BUTTONS */}

                <div
                  className="flex items-center my-1 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 
            after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                >
                  <a className="text-sm font-medium text-center mx-4">Or</a>
                </div>

                {/* BOXES */}
                <div className="space-y-4 mt-4 mb-4">
                  <div className="w-full">
                    <input
                      type="user"
                      placeholder="Full name"
                      className="px-4 py-2 bg-gray-50 w-full"
                    />
                  </div>

                  <div className="w-full">
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="px-4 py-2 bg-gray-50 w-full"
                    />
                  </div>

                  <div className="w-full">
                    <input
                      type="password"
                      placeholder="Password"
                      className="px-4 py-2 bg-gray-50 w-full "
                    />
                  </div>
                </div>
                {/* BOXES */}

                {/* CHECKBOX */}
                <div className="ml-1 text-sm flex justify-between mt-5 mb-5">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-500 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 
                dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                    <label htmlFor="remember" className="text-gray-500">
                      Remember me
                    </label>
                  </div>

                  <div>
                    <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 justify-end hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                {/* CHECKBOX */}

                {/* BUTTON LOGIN */}
                <button
                  className="w-full bg-indigo-400 text-white py-2 rounded-md font-semibold tracking-tight transition duration-500 ease 
            select-none hover:text-white hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
                >
                  Login{" "}
                </button>
                {/* BUTTON LOGIN */}
              </div>
            </div>
          </form>
        </main>
      </div>
    )
}

export default SignUp
