import { useNavigate } from "react-router-dom"
import { useCartContext } from "../../cart"
import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: cartDispatch } = useCartContext()
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("user")
    dispatch({ type: "LOGOUT" })
    cartDispatch({ type: "CLEAR" })
    navigate("/login")
  }

  return { logout }
}
