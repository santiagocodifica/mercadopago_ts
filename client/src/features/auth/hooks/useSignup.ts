import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signupApi } from "../api/signup"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
  const { dispatch } = useAuthContext()
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const signup = (name: string, email: string, password1: string, password2: string) => {
    signupApi(name, email, password1, password2)
      .then(user => {
        localStorage.setItem("user", JSON.stringify(user))
        dispatch({
          type: "LOGIN",
          payload: user
        })
        navigate("/")
      })
      .catch(err => {
        setError(err)
      })
  }

  return { signup, error }
}
