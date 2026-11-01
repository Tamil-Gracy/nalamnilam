
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'

import Home from './pages/Home'
import Shop from './pages/Shop'
import Login from './pages/Login'
import Signup from './pages/Signup'
import About from './pages/About'
import Contact from './pages/Contact'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Product from './pages/Product'
import Category from './pages/Category'
import Orders from './pages/Orders'
import OrderDetails from './pages/OrderDetails'
import FAQs from './pages/FAQs'
import ShippingDelivery from './pages/ShippingDelivery'
import ReturnsPolicy from './pages/ReturnsPolicy'
import TermsConditions from './pages/TermsConditions'

import Dashboard from './admin/Dashboard'
import Products from './admin/Products'
import ManageOrders from './admin/ManageOrders'
import Categories from './admin/Categories'
import Customers from './admin/Customers'
import AddProduct from "./admin/AddProduct"
import EditProduct from "./admin/EditProduct"
import Inventory from './admin/Inventory'
import Coupons from './admin/Coupons'
import Analytics from './admin/Analytics'
import Settings from './admin/Settings'
import AdminLogin from './admin/Login'
import Wishlist from './pages/Wishlist'
import Notifications from './pages/Notifications'

import AdminProtectedRoute from './admin/components/AdminProtectedRoute'

function AppContent() {
   const location = useLocation()

   const isAdminPage = location.pathname.startsWith('/admin')

   return (
      <>
         {!isAdminPage && <Header />}

         <main>
            <Routes>
               {/* Customer pages */}
               <Route path="/" element={<Home />} />
               <Route path="/shop" element={<Shop />} />
               <Route path="/product/:productId" element={<Product />} />
               <Route path="/category/:categoryId" element={<Category />} />
               <Route path="/about" element={<About />} />
               <Route path="/contact" element={<Contact />} />
               <Route path="/login" element={<Login />} />
               <Route path="/signup" element={<Signup />} />
               <Route path="/orderdetails" element={<OrderDetails />} />
               <Route path="/profile" element={<Profile />} />
               <Route path="/orders" element={<Orders />} />
               <Route path="/wishlist" element={<Wishlist />} />
               <Route path="/notifications" element={<Notifications />} />
               <Route path="/cart" element={<Cart />} />
               <Route path="/checkout" element={<Checkout />} />
               <Route path="/faqs" element={<FAQs />} />
               <Route path="/shipping-delivery" element={<ShippingDelivery />} />
               <Route path="/returns-policy" element={<ReturnsPolicy />} />
               <Route path="/terms-conditions" element={<TermsConditions />} />

               {/* Admin pages */}
               <Route path="/admin" element={<AdminLogin />} />
               <Route element={<AdminProtectedRoute />}>
                  <Route path="/admin/dashboard" element={<Dashboard />} />
                  <Route path="/admin/products" element={<Products />} />
                  <Route path="/admin/addproduct" element={<AddProduct />} />
                  <Route path="/admin/editproduct" element={<EditProduct />} />
                  <Route path="/admin/orders" element={<ManageOrders />} />
                  <Route path="/admin/categories" element={<Categories />} />
                  <Route path="/admin/customers" element={<Customers />} />
                  <Route path="/admin/inventory" element={<Inventory />} />
                  <Route path="/admin/coupons" element={<Coupons />} />
                  <Route path="/admin/analytics" element={<Analytics />} />
                  <Route path="/admin/settings" element={<Settings />} />
               </Route>
            </Routes>
         </main>

         {!isAdminPage && <Footer />}
      </>
   )
}

function App() {
   return (
         <AppContent />
   )
}

export default App
