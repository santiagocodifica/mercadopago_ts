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
    <form onSubmit={handleSubmit}>
      <label>Your email:</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Type your email..." />
      <label>Your Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Type your password..." />
      <button>Log in</button>
    </form>
  )
}

export default LoginForm 
