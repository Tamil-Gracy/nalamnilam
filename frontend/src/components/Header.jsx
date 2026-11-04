import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {auth} from "../config/firebase";
import { signOut } from 'firebase/auth';
import { useUser } from "../context/UserContext";
import { useCart } from "../context/CartContext";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const Header = () => {
   const userData = useUser();
   const user = userData.user;
   const setUser = userData.setUser;
   const [showProfile, setShowProfile] = useState(false);
   const [showMobileNav, setshowMobileNav] = useState(false);
   const { cartItems } = useCart();
   const [categories, setCategories] = useState([]);
   //console.log(userData)
   const navigate = useNavigate();
  
   async function getCategories() {
      const catresponse = await axios.get(`${API}/api/categories`);
      setCategories(catresponse.data.data || []);
   }
   useEffect(() => {
      auth.onAuthStateChanged((user) => {
         if (!user) {
            navigate('/login');
         } if (userData?.user?.firebaseUid) {
            console.log('User logged in...', userData?.user?.firebaseUid);
         }
      })
      getCategories()
   }, [user,cartItems]);





   const handleLogout = async () => {
      try {
         await signOut(auth);
         setUser(null);
         alert("Logout successful!");
         console.log('user logged out..')
         navigate("/");
      } catch (error) {
         alert("Logout failed. Please try again.");
         console.log("Logout error:", error);
      }
   };
  
   return (
      <header className="sticky top-0 z-20 border-b border-forest/10 bg-[#fffdf8]">
         <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-3 relative">
            <Link to="/" className="flex min-w-fit items-center gap-2 text-forest">
               <img src="../../images/logo.png" className="w-auto h-12" />
            </Link>
            <nav className="hidden items-center gap-7 text-xs md:flex">
               <Link to="/" className="font-medium text-forest hover:text-forest">Home</Link>
               <Link to="/shop" className="font-medium text-forest hover:text-forest">Shop</Link>
               {categories.slice(0,3).map((cat) => {
                  return(<Link to={`/category/${cat._id}`} className="font-medium text-forest hover:text-forest">{cat.name}</Link>)
               })}
               <Link to="/about" className="font-medium text-forest hover:text-forest">About</Link>
               <Link to="/contact" className="font-medium text-forest hover:text-forest">Contact</Link>

            </nav>
            {/* <div
               className="hidden w-56 items-center rounded-full border border-forest/15 bg-white px-4 py-2 text-[10px] text-ink/50 md:flex focus-within:outline-1"
            >
               <input type="text" placeholder="Search organic essentials..." className="focus:outline-none"></input>
               <span className="ml-auto text-lg text-ink">⌕</span>
            </div> */}
            <div className="hidden md:flex items-center gap-4 text-xl text-ink">
               {!user && (
                  <Link to="/login" className="cursor-pointer">
                     <i className="fa-solid fa-circle-user"></i>
                  </Link>)
               }
               {user && (
                  <div className="relative">
                     {/* Profile icon and arrow */}
                     <div className="flex items-center gap-3 cursor-pointer" onClick={() => setShowProfile(!showProfile)}>
                        <i className="fa-solid fa-circle-user"></i>
                        <span className="flex items-center gap-2">
                           <span className="text-sm ">NalamNilam</span>
                           {showProfile && (<i className="fa-solid fa-chevron-up text-sm"></i>)}
                           {!showProfile && (<i className="fa-solid fa-chevron-down text-sm"></i>)}
                        </span>

                     </div>

                     {/* Dropdown menu */}
                     {showProfile && (

                        <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-white p-3 shadow-xl border border-gray-100 z-50">
                           <div className="space-y-1">
                              <p className="px-3 py-2 font-semibold text-forest truncate">
                                 {user?.name || "My account"}
                              </p>

                              <hr className="border-gray-100 my-1" />

                              <Link
                                 to="/profile"
                                 className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-[#eaf1df] hover:text-forest transition-colors"
                                 onClick={() => setShowProfile(false)}
                              >
                                 <i className="fa-solid fa-user w-5 text-center"></i>
                                 My Profile
                              </Link>

                              <Link
                                 to="/orders"
                                 className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-[#eaf1df] hover:text-forest transition-colors"
                                 onClick={() => setShowProfile(false)}
                              >
                                 <i className="fa-solid fa-box-open w-5 text-center"></i>
                                 My Orders
                              </Link>

                              <Link
                                 to="/wishlist"
                                 className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-[#eaf1df] hover:text-forest transition-colors"
                                 onClick={() => setShowProfile(false)}
                              >
                                 <i className="fa-solid fa-heart w-5 text-center"></i>
                                 My Wishlist
                              </Link>

                              <Link
                                 to="/notifications"
                                 className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-[#eaf1df] hover:text-forest transition-colors"
                                 onClick={() => setShowProfile(false)}
                              >
                                 <i className="fa-solid fa-bell w-5 text-center"></i>
                                 Notifications
                              </Link>

                              <hr className="border-gray-100 my-1" />

                              <button
                                 type="button"
                                 onClick={handleLogout}
                                 className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
                              >
                                 <i className="fa-solid fa-right-from-bracket w-5 text-center"></i>
                                 Logout
                              </button>
                           </div>
                        </div>

                     )}

                  </div>
               )}
               <Link to='/cart' className="relative" >
                  <i className="fa-solid fa-basket-shopping"></i>
                  <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-forest text-[9px] text-white" >{cartItems?.length || 0}</span>
               </Link>
            </div>
            <div className="mobileNav md:hidden relative cursor-pointer">
               <i className="fa-solid fa-bars" onClick={(e) => setshowMobileNav(!showMobileNav)}></i>
            </div>
            {showMobileNav && (
               <div className="mobileNavLinks fixed right-0 top-0 bottom-0 bg-[#e8efe5] w-auto p-5 shadow-2xl border-l border-[#24563B]/10 ">

                  {/* Close button */}
                  <div className="flex justify-end mb-5">
                     <button
                        type="button"
                        onClick={() => setshowMobileNav(false)}
                        className="flex items-center justify-center w-9 h-9 rounded-full bg-white text-[#24563B] shadow-sm cursor-pointer"
                        aria-label="Close menu"
                     >
                        <i className="fa-solid fa-xmark text-lg"></i>
                     </button>
                  </div>
                  <Link to="/" className="flex min-w-fit items-center gap-2 text-forest">
                     <img src="../../images/logo.png" className="w-auto h-12" />
                  </Link>
                  <div className="my-2 border-t border-[#24563B]/15"></div>
                  <nav className="flex flex-col text-right gap-2 text-xs py-3">
                     <Link to="/" onClick={() => setshowMobileNav(false)}
                        className="font-medium text-[#24563B] rounded-lg px-3 py-2 flex justify-between items-center">
                        Home
                        <i className="fa-solid fa-chevron-right"></i>
                     </Link>


                     <Link to="/shop" onClick={() => setshowMobileNav(false)}
                        className="font-medium text-[#24563B] rounded-lg px-3 py-2 flex justify-between items-center">
                        Shop
                        <i className="fa-solid fa-chevron-right"></i>
                     </Link>
                     {categories.slice(0, 3).map((cat) => {
                        return (<Link to={`/category/${cat._id}`} className="font-medium text-[#24563B] rounded-lg px-3 py-2 flex justify-between items-center" >
                           {cat.name}
                           <i className="fa-solid fa-chevron-right"></i>
                        </Link>)
                     })}
                     <Link to="/about" onClick={() => setshowMobileNav(false)}
                        className="font-medium text-[#24563B] rounded-lg px-3 py-2 flex justify-between items-center">
                        About
                        <i className="fa-solid fa-chevron-right"></i>
                     </Link>

                     <Link to="/contact" onClick={() => setshowMobileNav(false)}
                        className="font-medium text-[#24563B] rounded-lg px-3 py-2 flex justify-between items-center">
                        Contact
                        <i className="fa-solid fa-chevron-right"></i>
                     </Link>
                  </nav>
               </div>
            )}

         </div>
         <div className="mobileNav md:hidden">
            <div className="fixed bottom-0 bg-[#24563B] text-white p-4 w-full">
               <div className="links flex justify-between items-center text-center">
                  <div className="cursor-pointer">
                     <Link to="/">
                        <i className="fa-solid fa-home"></i>
                        <p>Home</p>
                     </Link>
                  </div>
                  <div className="cursor-pointer">
                     <Link to="/shop">
                        <i className="fa-solid fa-shop"></i>
                        <p>Shop</p>
                     </Link>
                  </div>
                  <div className="cursor-pointer">
                     <Link to="/profile">
                        <i className="fa-solid fa-user"></i>
                        <p>Account</p>
                     </Link>
                  </div>
                  <div className="cursor-pointer">
                     <Link to="/cart">
                        <i className="fa-solid fa-cart-shopping"></i>
                        <p>Cart</p>
                     </Link>
                  </div>
               </div>

            </div>
         </div>
      </header>
   )
}

export default Header;