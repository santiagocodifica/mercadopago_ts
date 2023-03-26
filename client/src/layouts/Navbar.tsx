import { Link, useLocation, useSearchParams } from "react-router-dom"
import MenuButton from "../components/MenuButton"
import { LogoutButton, useAuthContext } from "../features/auth"

const Navbar = () => {
  const { user } = useAuthContext()
  const [searchParams] = useSearchParams()
  const location = useLocation()

  return(
    <header className="fixed top-0 z-20 w-full px-4 md:px-8 py-8 flex gap-4 place-items-center md:place-items-baseline">
      <h1 className="text-2xl font-serif grow md:grow-0 hover:text-primary3 transition-all">
        <Link to="">New Arrival</Link>
      </h1>
      <MenuButton />
      <ul className="hidden md:flex grow gap-2 text-primary2">
        <li className={`hover:text-primary1 transition-all ${searchParams.get("gender") === "men" ? "text-primary1 border-b border-primary1" : ""}`}>
          <Link to="catalog/?gender=men">Men</Link>
        </li>
        <li className={`hover:text-primary1 transition-all ${searchParams.get("gender") === "women" ? "text-primary1 border-b border-primary1" : ""}`}>
          <Link to="catalog/?gender=women">Women</Link>
        </li>
        <li className={`hover:text-primary1 transition-all ${!searchParams.get("gender") && location.pathname === "/catalog" ? "text-primary1 border-b border-primary1" : ""}`}>
          <Link to="catalog">All</Link>
        </li>
      </ul>
      { user
        ? 
        <ul className="hidden md:flex gap-2 text-primary2">
          <li className="hover:text-primary1 transition-all">Cart</li>
          <li className="hover:text-primary1 transition-all">Account</li>
          <li className="hover:text-secondary1 transition-all"><LogoutButton /></li>
        </ul>
        :
        <ul className="hidden md:flex gap-2 text-primary2">
          <li className="hover:text-primary1 transition-all"><Link to="login">Log In</Link></li>
          <li className="hover:text-primary1 transition-all"><Link to="signup">Sign Up</Link></li>
        </ul>
      }
    </header>
  )
}
export default Navbar
