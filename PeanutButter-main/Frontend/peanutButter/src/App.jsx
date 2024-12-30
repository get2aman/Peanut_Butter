import Login from "./pages/Login"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Register from "./pages/Register"
import Home from "./pages/Home"
import AboutUs from "./pages/Aboutus"
import Cart from "./pages/Cart"
import Success from "./pages/Success"
import PaymentHistory from "./pages/PaymentHistory"
import PaymentPage from "./pages/PaymentPage"
import AdminLogin from "./pages/AdminLogin"
import AdminPayment from "./pages/AdminPayment"
import AdminCompletePayment from "./pages/AdminCompleteOrder"


function App() {
  return(
    <>
    <Router>
      <Routes>
      <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/success" element={<Success/>}/>
        <Route path="/history" element={<PaymentHistory/>}/>
        <Route path="/payment" element={<PaymentPage/>}/>
        <Route path="/adminlogin" element={<AdminLogin/>}/>
        <Route path="/adminpayment" element={<AdminPayment/>}/>
        <Route path="/admincompleteorder" element={<AdminCompletePayment/>}/>
        
      </Routes>
    </Router>
    </>
  )
}

export default App
