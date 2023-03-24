import { Routes, Route } from "react-router-dom"
import Menu from "./layouts/Menu"
import Navbar from "./layouts/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App() {
  return (
    <div className="text-primary1">
      <Navbar />
      <Menu />
      <Routes>
        <Route path="" element={ <Home /> } />
        <Route path="signup" element={ <Signup /> } />
        <Route path="login" element={ <Login /> } />
      </Routes>
    </div>
  )
}

export default App
