import { useState } from "react"
import { useLogin } from "../api/login"

const LoginForm = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const { login } = useLogin()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    login(email, password)
  }

  return(
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label>Your email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Type your email..."
          className="border border-primary3 focus:border-primary1 placeholder:text-primary3 p-2 outline-none rounded"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label>Your Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Type your password..."
          className="border border-primary3 focus:border-primary1 placeholder:text-primary3 p-2 outline-none rounded"
        />
      </div>
      <button className="mt-4 text-lg w-fit border border-primary1 rounded p-2 hover:bg-primary1 hover:text-white transition-all">
        Log into account
      </button>
    </form>
  )
}

export default LoginForm 
