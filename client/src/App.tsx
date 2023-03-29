import { Routes, Route, Outlet } from "react-router-dom"
import Footer from "./layouts/Footer"
import Menu from "./layouts/Menu"
import Navbar from "./layouts/Navbar"
import Cart from "./pages/Cart"
import Catalog from "./pages/Catalog"
import Home from "./pages/Home"
import Login from "./pages/Login"
import PrepareOrder from "./pages/PrepareOrder"
import Product from "./pages/Product"
import Signup from "./pages/Signup"

function App() {
  return (
    <div className="text-primary1">
      <Routes>
        <Route path="" element={<><Navbar /><Menu /><Outlet /><Footer /></>}>
          <Route path="" element={ <Home /> } />
          <Route path="catalog" element={ <Catalog /> } />
          <Route path="product/:id" element={ <Product /> } />
          <Route path="cart" element={ <Cart /> } />
          <Route path="prepareOrder" element={ <PrepareOrder /> } />
        </Route>
        <Route path="signup" element={<><Navbar /><Signup /></>} />
        <Route path="login" element={ <><Navbar /><Login /></> } />
      </Routes>
    </div>
  )
}

export default App
