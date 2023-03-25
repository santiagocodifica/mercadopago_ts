import { Link } from "react-router-dom"
import { LogoutButton } from "../features/auth"
import { useModalsContext } from "../features/modals"

const Menu = () => {

  const { menuModal, dispatch }: any = useModalsContext()

  const handleClick = () => {
    dispatch({
      type: "CLOSE",
      payload: "menuModal"
    })
  }

  return (
    <div className={`${menuModal.isOpen ? "top-0" : "-top-[100vh]"} w-full h-full bg-white fixed z-10 p-4 py-32 text-lg transition-all duration-500`}>
      <div className="mb-6">
        <h2>Catalog</h2>
        <ul className="text-primary2">
          <li>
            <Link to="catalog/?gender=men" onClick={handleClick}>Men</Link>
          </li>
          <li>
            <Link to="catalog/?gender=women" onClick={handleClick}>Women</Link>
          </li>
          <li>
            <Link to="catalog" onClick={handleClick}>All</Link>
          </li>
        </ul>
      </div>
      <div>
        <h2>Other</h2>
        <ul className="text-primary2">
          <li>Account</li>
          <li>Cart</li>
          <li className="text-secondary1"><LogoutButton /></li>
        </ul>
      </div>
    </div>
  )
}
export default Menu
