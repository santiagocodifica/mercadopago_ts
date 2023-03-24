import { createContext, useReducer, useEffect } from "react"
import { UserI } from "../../../types/schemas"

interface AuthContextI {
  user: UserI | null
  dispatch?: any //Debería declarar mejor la función dispatch
}

type State = {
  user: UserI | null
}

type Action = {
  type: string,
  payload: UserI | null //No siempre necesitamos un payload, por ej para hacer logout
}

export const AuthContext = createContext<AuthContextI>({ user: null })

export const authReducer = (state: State, action: Action) => {
  switch(action.type){
    case "LOGIN":
      return { user: action.payload }
    case "LOGOUT":
      return { user: null }
    default:
      return state
  }
}

interface AuthContextProviderI {
  children: React.ReactNode
}

export const AuthContextProvider = ({ children }: AuthContextProviderI) => {
  const [state, dispatch] = useReducer(authReducer, { user: null })

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
