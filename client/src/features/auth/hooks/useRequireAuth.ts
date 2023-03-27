import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "./useAuthContext"

export const useRequireAuth = () => {
  const { user } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if(!user || user.role !== "customer"){
      navigate("/login")
    }
  },[user])
}
