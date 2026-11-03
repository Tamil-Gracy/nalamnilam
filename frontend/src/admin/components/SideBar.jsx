import { NavLink, Link, useNavigate } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { adminAuth } from '../../config/firebase';

const SideBar = () => {
   const navClass = ({ isActive }) =>
      `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${isActive
         ? "bg-[#DCE9C9] font-bold text-[#1F3827]"
         : "text-stone-600 hover:bg-stone-100"
      }`;

   const navigate = useNavigate();
   const handleLogout = async () => {
      try {
         await signOut(adminAuth);
         alert("Admin Logout successful!");
         console.log('Admin logged out..')
         navigate("/admin");
      } catch (error) {
         alert("Logout failed. Please try again.");
         console.log("Logout error:", error);
      }
   };

   return (
      <>
         <aside className="border-r border-stone-200 bg-white px-4 py-5 lg:min-h-screen">
            <NavLink to="/admin" className="font-serif block px-3 text-xl font-bold text-[#1F3827]">
               <img src="../../images/logo.png" className="w-auto h-12" />
            </NavLink>
            <nav className="mt-8 grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-1">
               <NavLink to="/admin/dashboard" className={navClass}>
                  <span className="w-5 text-center">⌂</span>
                  Dashboard
               </NavLink>
               <NavLink to="/admin/categories" className={navClass}>
                  <span className="w-5 text-center">▧</span>
                  Categories
               </NavLink>
               <NavLink to="/admin/products" className={navClass}>
                  <span className="w-5 text-center">▦</span>
                  Products
               </NavLink>
               <NavLink to="/admin/addproduct" className={navClass}>
                  <span className="w-5 text-center">＋</span>
                  Add product
               </NavLink>
               <NavLink to="/admin/orders" className={navClass}>
                  <span className="w-5 text-center">▤</span>
                  Orders
               </NavLink>
               <NavLink to="/admin/inventory" className={navClass}>
                  <span className="w-5 text-center">▥</span>
                  Inventory
               </NavLink>
               <NavLink to="/admin/customers" className={navClass}>
                  <span className="w-5 text-center">♙</span>
                  Customers
               </NavLink>
              
               {/* <NavLink to="/admin/coupons" className={navClass}>
                  <span className="w-5 text-center">％</span>
                  Coupons
               </NavLink>
               <NavLink to="/admin/analytics" className={navClass}>
                  <span className="w-5 text-center">↗</span>
                  Analytics
               </NavLink> */}
               <NavLink to="/admin/settings" className={navClass}>
                  <span className="w-5 text-center">⚙</span>
                  Settings
               </NavLink>
               <a className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-600 hover:bg-stone-100 cursor-pointer" onClick={handleLogout}>
                  <span className="w-5 text-center">⚙</span>
                  Logout
               </a>
            </nav>
            <NavLink to="../../" className="mt-6 block rounded-xl border border-stone-200 px-4 py-3 text-sm font-semibold text-stone-600 hover:bg-stone-50">← View storefront</NavLink>
         </aside>
      </>
   )
}

export default SideBar