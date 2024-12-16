import Navbar from "./components/Navbar"
import { Routes,Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import { Toaster } from "react-hot-toast"
import { useUserStore } from "./store/useUserStore"
import { useEffect } from "react"
import AdminPage from "./pages/AdminPage"
import CategoryPage from "./pages/CategoryPage"
import ProductPage from "./pages/ProductPage"
import { useCartStore } from "./store/useCartStore"
import CartPage from "./pages/CartPage"
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage"
import PurchaseCancelPage from "./pages/PurchaseCancelPage"




function App() {

  const {user,checkAuth} = useUserStore()
  const {getCartItems} = useCartStore()

  useEffect(()=>{checkAuth()},[checkAuth])

  useEffect(()=>{
    if(!user) return;
    getCartItems()
  },[getCartItems,user])
  
  return (
    <div className="app">
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/signup" element={!user ?<SignUpPage/> : <Navigate to="/"/>}/>
        <Route path="/login" element={!user ?<LoginPage/> : <Navigate to="/"/> }/>
        <Route path="/dashboard" element={user?.role === "admin" ? <AdminPage/> : <Navigate to="/login"/>} />
        <Route path="/category/:category" element={<CategoryPage/>}/>
        <Route path="/product/:id" element={<ProductPage/>} />
        <Route path="/cart" element={user ?<CartPage/> : <Navigate to="/"/>}/>
        <Route
						path='/purchase-success'
						element={<PurchaseSuccessPage /> }/>
					<Route path='/purchase-cancel' element={<PurchaseCancelPage /> } />
				</Routes>
      <Toaster/>
    </div>
  )
}

export default App