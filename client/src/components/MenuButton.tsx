import { useModalsContext } from "../features/modals"
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"

const MenuButton = () => {
  const { menuModal, dispatch } = useModalsContext()

  const toggleModal = () => {
    dispatch({
      type: `${menuModal.isOpen ? "CLOSE" : "OPEN"}`,
      payload: "menuModal"
    })
  }

  return(
    <>
      { menuModal.isOpen
        ? <AiOutlineClose className="text-2xl md:hidden" onClick={toggleModal} />
        : <AiOutlineMenu className="text-2xl md:hidden" onClick={toggleModal} />
      }
    </>
  )
}
export default MenuButton
