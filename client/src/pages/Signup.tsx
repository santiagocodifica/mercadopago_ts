import { SignupForm } from "../features/auth"
import Navbar from "../layouts/Navbar"

const Signup = () => {
  return(
    <>
      <Navbar />
      <div className="p-3 md:p-8 mt-40 md:grid md:grid-cols-2">
        <h2 className="font-serif text-5xl mb-10">Create Account</h2>
        <div className="md:w-4/5 lg:w-2/3">
          <SignupForm />
        </div>
      </div>
    </>
  )
}
export default Signup
