import { Link } from "react-router-dom"

const Success = () => {
  return(
    <main className="h-screen w-screen flex flex-col gap-4 place-items-center place-content-center text-center">
      <h2 className="text-4xl font-serif">Your Order was successfully made!</h2>
      <Link to="/" className="p-3 bg-secondary2 rounded-md hover:bg-primary1 hover:text-white transition-all">Continue</Link>
    </main>
  )
}
export default Success
