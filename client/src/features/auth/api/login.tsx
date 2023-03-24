import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

const loginApi = async (email: string, password: string) => {
  const res = await fetch(`/api/v1/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
  const json = await res.json()
  if(!res.ok){
    throw json.error
  }
  return json
}

export const useLogin = () => {
  const { dispatch } = useAuthContext()
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const login = (email: string, password: string) => {
    loginApi(email, password)
      .then(user=> {
        localStorage.setItem("user", JSON.stringify(user))
        dispatch({ type: "LOGIN", payload: user})
        navigate("/")
      })
      .catch(err => {
        setError(err)
      })
  }

  return { login, error }
}
