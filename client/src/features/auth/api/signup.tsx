import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

const signupApi = async (name: string, email:string, password1: string, password2: string)=> {
  const res = await fetch(`/api/v1/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password1, password2 })
  })
  const json = await res.json()
  if(!res.ok){
    throw json.error
  }
  return json
}

export const useSignup = () => {
  const { dispatch } = useAuthContext()
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const signup = (name: string, email: string, password1: string, password2: string) => {
    signupApi(name, email, password1, password2)
      .then(user => {
        localStorage.setItem("user", JSON.stringify(user))
        dispatch({ type: "LOGIN", payload: user }) 
        navigate("/")
      })
      .catch(err => {
        setError(err)
      })
  }

  return { signup, error }
}
