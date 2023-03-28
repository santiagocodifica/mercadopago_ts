import { createContext, useReducer, useEffect } from "react"
import { UntokenizedUserI, UserI } from "../../../types/schemas"

interface AuthContextI {
  user: UserI | null
  dispatch: React.Dispatch<Action>
}
type State = {
  user: UserI | null
}
type Action =
| { type: "LOGIN", payload: UserI }
| { type: "LOGOUT" }
| { type: "UPDATE", payload: UntokenizedUserI }

export const AuthContext = createContext<AuthContextI>({ user: null, dispatch: () => null })

export const authReducer = (state: State, action: Action) => {
  switch(action.type){
    case "LOGIN":
      return { user: action.payload }
    case "LOGOUT":
      return { user: null }
    case "UPDATE": {
      const token = state.user?.token || ""
      localStorage.setItem("user", JSON.stringify({ token, ...action.payload }))
      return { user: { token, ...action.payload } }
    }
    default:
      return state
  }
}

interface AuthContextProviderI {
  children: React.ReactNode
}

export const AuthContextProvider = ({ children }: AuthContextProviderI) => {
  const [state, dispatch] = useReducer(authReducer, { user: null } as State)

  console.log(state)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if(storedUser){
      const user: UserI = JSON.parse(storedUser)
      dispatch({ type: "LOGIN", payload: user })
    }
  },[])

  return(
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )
}
