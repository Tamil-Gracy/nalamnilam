import { Link } from "react-router-dom";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
const Dashboard = () => {
   return (
      <>
         <div className="min-h-screen lg:grid lg:grid-cols-[250px_1fr]">
            <SideBar />
            <div>
              <TopBar />
               <main className="p-5 sm:p-8">
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                     <div className="rounded-2xl border border-stone-200 bg-white p-5">
                        <p className="text-sm text-stone-500">Orders today</p>
                        <p className="mt-2 text-3xl font-bold text-[#1F3827]">24</p>
                        <p className="mt-2 text-xs text-stone-500">8 awaiting confirmation</p>
                     </div>
                     <div className="rounded-2xl border border-stone-200 bg-white p-5">
                        <p className="text-sm text-stone-500">Sales today</p>
                        <p className="mt-2 text-3xl font-bold text-[#1F3827]">₹18,420</p>
                        <p className="mt-2 text-xs text-stone-500">Demo figures</p>
                     </div>
                     <div className="rounded-2xl border border-stone-200 bg-white p-5">
                        <p className="text-sm text-stone-500">Products listed</p>
                        <p className="mt-2 text-3xl font-bold text-[#1F3827]">86</p>
                        <p className="mt-2 text-xs text-stone-500">7 categories</p>
                     </div>
                     <div className="rounded-2xl border border-stone-200 bg-white p-5">
                        <p className="text-sm text-stone-500">Low stock</p>
                        <p className="mt-2 text-3xl font-bold text-[#1F3827]">6</p>
                        <p className="mt-2 text-xs text-stone-500">Review inventory</p>
                     </div>
                  </div>
                  <div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
                     <section className="rounded-2xl border border-stone-200 bg-white p-5">
                        <div className="flex items-center justify-between">
                           <h2 className="font-bold">Recent orders</h2>
                           <Link to="/admin/orders" className="text-sm font-bold text-[#315C3B]">View all ↗</Link>
                        </div>
                        <div className="mt-5">
                           <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white">
                              <table className="w-full min-w-[650px] text-left text-sm">
                                 <thead className="bg-stone-50 text-xs uppercase tracking-wider text-stone-500">
                                    <tr>
                                       <th className="px-5 py-4">Order</th>
                                       <th className="px-5 py-4">Customer</th>
                                       <th className="px-5 py-4">Amount</th>
                                       <th className="px-5 py-4">Status</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    <tr className="border-t border-stone-100">
                                       <td className="px-5 py-4">RR-10284</td>
                                       <td className="px-5 py-4">Meena S.</td>
                                       <td className="px-5 py-4">₹880</td>
                                       <td className="px-5 py-4">
                                          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">Preparing</span>
                                       </td>
                                    </tr>
                                    <tr className="border-t border-stone-100">
                                       <td className="px-5 py-4">RR-10283</td>
                                       <td className="px-5 py-4">Arun K.</td>
                                       <td className="px-5 py-4">₹460</td>
                                       <td className="px-5 py-4">
                                          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800">Confirmed</span>
                                       </td>
                                    </tr>
                                    <tr className="border-t border-stone-100">
                                       <td className="px-5 py-4">RR-10282</td>
                                       <td className="px-5 py-4">Divya R.</td>
                                       <td className="px-5 py-4">₹1,120</td>
                                       <td className="px-5 py-4">
                                          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800">Delivered</span>
                                       </td>
                                    </tr>
                                 </tbody>
                              </table>
                           </div>
                        </div>
                     </section>
                     <section className="rounded-2xl border border-stone-200 bg-white p-5">
                        <h2 className="font-bold">Inventory watch</h2>
                        <div className="mt-5 space-y-5">
                           <div>
                              <div className="flex justify-between text-sm">
                                 <span>Country Tomatoes</span>
                                 <b>4 kg</b>
                              </div>
                              <div className="mt-2 h-2 rounded-full bg-stone-100">
                                 <div className="h-2 rounded-full bg-[#C8754B] w-[18%]"></div>
                              </div>
                           </div>
                           <div>
                              <div className="flex justify-between text-sm">
                                 <span>Baby Spinach</span>
                                 <b>6 bunches</b>
                              </div>
                              <div className="mt-2 h-2 rounded-full bg-stone-100">
                                 <div className="h-2 rounded-full bg-[#C8754B] w-[28%]"></div>
                              </div>
                           </div>
                           <div>
                              <div className="flex justify-between text-sm">
                                 <span>Foxtail Millet</span>
                                 <b>22 packs</b>
                              </div>
                              <div className="mt-2 h-2 rounded-full bg-stone-100">
                                 <div className="h-2 rounded-full bg-[#66834D] w-[70%]"></div>
                              </div>
                           </div>
                           <div>
                              <div className="flex justify-between text-sm">
                                 <span>Red Apples</span>
                                 <b>18 kg</b>
                              </div>
                              <div className="mt-2 h-2 rounded-full bg-stone-100">
                                 <div className="h-2 rounded-full bg-[#66834D] w-[58%]"></div>
                              </div>
                           </div>
                        </div>
                        <Link to="/admin/inventory" className="mt-6 inline-block text-sm font-bold text-[#315C3B]">Manage inventory ↗</Link>
                     </section>
                  </div>
                  <div className="mt-8 rounded-2xl bg-[#DCE9C9] p-5">
                     <p className="font-bold text-[#1F3827]">Daily store reminder</p>
                     <p className="mt-1 text-sm leading-6 text-[#4C634A]">Check low stock before accepting new orders. Product availability and final order status should be validated by the backend in the working application.</p>
                  </div>
               </main>
            </div>
         </div>
      </>
   );
}


export default Dashboard;