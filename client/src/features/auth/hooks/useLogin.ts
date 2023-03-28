import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginApi } from "../api/login"
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {
  const { dispatch } = useAuthContext()
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const login = (email: string, password: string) => {
    loginApi(email, password)
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

  return { login, error }
}
