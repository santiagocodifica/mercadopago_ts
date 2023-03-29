import { Routes, Route, Outlet } from "react-router-dom"
import { useAuthContext } from "./features/auth"
import Footer from "./layouts/Footer"
import Menu from "./layouts/Menu"
import Navbar from "./layouts/Navbar"
import Cart from "./pages/Cart"
import Catalog from "./pages/Catalog"
import Checkout from "./pages/Checkout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import PrepareOrder from "./pages/PrepareOrder"
import Product from "./pages/Product"
import Signup from "./pages/Signup"

function App() {
  const { user } = useAuthContext()
  return (
    <div className="text-primary1">
      <Routes>
        <Route path="" element={<><Navbar /><Menu /><Outlet /><Footer /></>}>
          <Route path="" element={ <Home /> } />
          <Route path="catalog" element={ <Catalog /> } />
          <Route path="product/:id" element={ <Product /> } />
          <Route path="cart" element={ user ? <Cart /> : <Login /> } />
          <Route path="prepareOrder" element={ user ? <PrepareOrder /> : <Login /> } />
        </Route>
        <Route path="checkout" element={user ? <Checkout /> : <Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
