import { Link, useSearchParams } from "react-router-dom"

const Error = () => {
  const [searchParams] = useSearchParams()
  const error = searchParams.get("error")
  return(
    <main className="h-screen w-screen flex flex-col gap-4 place-items-center place-content-center text-center">
      <h2 className="text-4xl">Error.</h2>
      { error &&
        <p className="text-primary2">{ decodeURI(error) }</p>
      }
      <Link to="/" className="p-3 bg-secondary2 rounded hover:bg-primary1 hover:text-white transition-all">Continue</Link>
    </main>
  )
}
export default Error
