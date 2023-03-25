import { Routes, Route } from "react-router-dom"
import Footer from "./layouts/Footer"
import Menu from "./layouts/Menu"
import Navbar from "./layouts/Navbar"
import Catalog from "./pages/Catalog"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Product from "./pages/Product"
import Signup from "./pages/Signup"

function App() {
  return (
    <div className="text-primary1">
      <Navbar />
      <Menu />
      <Routes>
        <Route path="" element={ <Home /> } />
        <Route path="catalog" element={ <Catalog /> } />
        <Route path="product/:id" element={ <Product /> } />
        <Route path="signup" element={ <Signup /> } />
        <Route path="login" element={ <Login /> } />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
