import { createContext, useReducer } from "react"

export type ModalT = {
  isOpen: boolean
}
interface ModalsContextI {
  menuModal: ModalT
  addLocationModal: ModalT
  dispatch?: any
}
type ModalType = "menuModal" | "addLocationModal"
interface State {
  menuModal: ModalT
  addLocationModal: ModalT
}
type Action = {
  type: "OPEN" | "CLOSE"
  payload: ModalType
}
const initialContext = {
  menuModal: { isOpen: false },
  addLocationModal: { isOpen: false }
}

export const ModalsContext = createContext<ModalsContextI>(initialContext)

export const modalsReducer = (state: State, action: Action) => {
  switch(action.type){
    case "OPEN": {
      return { ...state, [action.payload]: { isOpen: true} }
    }
    case "CLOSE": {
      return { ...state, [action.payload]: { isOpen: false} }
    }
    default:
      return state
  }
}

interface ModalsContextProviderI {
  children: React.ReactNode
}

export const ModalsContextProvider = ({ children }: ModalsContextProviderI) => {
  const [state, dispatch] = useReducer(modalsReducer, initialContext)

  console.log(state)

  return(
    <ModalsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </ModalsContext.Provider>
  )
}
