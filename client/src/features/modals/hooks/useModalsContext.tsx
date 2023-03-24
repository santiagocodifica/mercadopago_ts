import { useContext } from "react"
import { ModalsContext } from "../context/ModalsContext"

export const useModalsContext = () => {
  const context = useContext(ModalsContext)
  if(!context){
    throw Error("useModalsContext must be used inside ModalsContextProvider")
  }
  return context
}
