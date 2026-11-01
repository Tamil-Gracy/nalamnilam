import { Link } from "react-router-dom"

const SideBar = () => {
   return (
      <>
         <aside className="border-r border-stone-200 bg-white px-4 py-5 lg:min-h-screen">
            <Link to="/admin" className="font-serif block px-3 text-xl font-bold text-[#1F3827]">
               <img src="../../images/logo.png" className="w-auto h-12" />
            </Link>
            <nav className="mt-8 grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-1">
               <Link to="/admin" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm bg-[#DCE9C9] font-bold text-[#1F3827]">
                  <span className="w-5 text-center">⌂</span>
                  Dashboard
               </Link>
               <Link to="/admin/products" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-stone-600 hover:bg-stone-100">
                  <span className="w-5 text-center">▦</span>
                  Products
               </Link>
               <Link to="/admin/addproduct" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-stone-600 hover:bg-stone-100">
                  <span className="w-5 text-center">＋</span>
                  Add product
               </Link>
               <Link to="/admin/orders" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-stone-600 hover:bg-stone-100">
                  <span className="w-5 text-center">▤</span>
                  Orders
               </Link>
               <Link to="/admin/inventory" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-stone-600 hover:bg-stone-100">
                  <span className="w-5 text-center">▥</span>
                  Inventory
               </Link>
               <Link to="/admin/customers" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-stone-600 hover:bg-stone-100">
                  <span className="w-5 text-center">♙</span>
                  Customers
               </Link>
               <Link to="/admin/categories" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-stone-600 hover:bg-stone-100">
                  <span className="w-5 text-center">▧</span>
                  Categories
               </Link>
               <Link to="/admin/coupons" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-stone-600 hover:bg-stone-100">
                  <span className="w-5 text-center">％</span>
                  Coupons
               </Link>
               <Link to="/admin/analytics" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-stone-600 hover:bg-stone-100">
                  <span className="w-5 text-center">↗</span>
                  Analytics
               </Link>
               <Link to="/admin/settings" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-stone-600 hover:bg-stone-100">
                  <span className="w-5 text-center">⚙</span>
                  Settings
               </Link>
            </nav>
            <div className="mt-8 hidden rounded-2xl bg-[#F8F7F0] p-4 lg:block">
               <p className="text-xs font-bold uppercase tracking-wider text-[#315C3B]">Store status</p>
               <p className="mt-2 text-sm font-semibold">Local delivery active</p>
               <p className="mt-1 text-xs leading-5 text-stone-500">Manage serviceable PIN codes in settings.</p>
            </div>
            <Link to="../../" className="mt-6 block rounded-xl border border-stone-200 px-4 py-3 text-sm font-semibold text-stone-600 hover:bg-stone-50">← View storefront</Link>
         </aside>
      </>
   )
}

export default SideBar