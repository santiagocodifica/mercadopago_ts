import { useState } from "react"
import { useSignup } from "../api/signup"

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
    <form onSubmit={handleSubmit}>
      <label>Your name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Type your name..." />
      <label>Your email:</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Type your email..." />
      <label>Your Password:</label>
      <input type="password" value={password1} onChange={(e) => setPassword1(e.target.value)} placeholder="Type your password..." />
      <label>Your Password Again:</label>
      <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} placeholder="Type your password again..." />
      <button>Create User</button>
    </form>
  )
}

export default SignupForm
