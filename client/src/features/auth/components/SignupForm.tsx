import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const SignupForm = () => {
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password1, setPassword1] = useState<string>("")
  const [password2, setPassword2] = useState<string>("")
  const { signup } = useSignup()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    signup(name, email, password1, password2)
    console.log("signupping")
  }

  return(
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label>Your name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Type your name..."
          className="border border-primary3 focus:border-primary1 placeholder:text-primary3 p-2 outline-none rounded"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label>Your email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Type your email..."
          className="border border-primary3 focus:border-primary1 placeholder:text-primary3 p-2 outline-none rounded"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label>Your Password:</label>
        <input type="password" value={password1} onChange={(e) => setPassword1(e.target.value)} placeholder="Type your password..."
          className="border border-primary3 focus:border-primary1 placeholder:text-primary3 p-2 outline-none rounded"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label>Your Password Again:</label>
        <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} placeholder="Type your password again..."
          className="border border-primary3 focus:border-primary1 placeholder:text-primary3 p-2 outline-none rounded"
        />
      </div>
      <button className="mt-4 text-lg w-fit border border-primary1 rounded p-2 hover:bg-primary1 hover:text-white transition-all">
        Create User
      </button>
    </form>
  )
}

export default SignupForm
