import MenuButton from "../components/MenuButton"
import { LogoutButton } from "../features/auth"

const Navbar = () => {

  return(
    <header className="fixed top-0 z-20 w-full px-4 md:px-8 py-8 flex gap-4 place-items-center md:place-items-baseline">
      <h1 className="text-2xl font-serif grow md:grow-0">New Arrival</h1>
      <MenuButton />
      <ul className="hidden md:flex grow gap-2 text-primary2">
        <li className="hover:text-primary1 transition-all">Men</li>
        <li className="hover:text-primary1 transition-all">Women</li>
        <li className="hover:text-primary1 transition-all">All</li>
      </ul>
      <ul className="hidden md:flex gap-2 text-primary2">
        <li className="hover:text-primary1 transition-all">Cart</li>
        <li className="hover:text-primary1 transition-all">Account</li>
        <li className="hover:text-secondary1 transition-all"><LogoutButton /></li>
      </ul>
    </header>
  )
}
export default Navbar
