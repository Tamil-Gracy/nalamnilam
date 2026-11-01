import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../config/firebase";
import { useUser } from "../context/UserContext";

const Orders = () => {

   const userData = useUser();
   const user = userData.user;
   const setUser = userData.setUser;
   const navigate = useNavigate();
   useEffect(() => {
      auth.onAuthStateChanged((user) => {
         if (!user) {
            navigate('/login');
            return;
         }
      })
   }, [navigate]);

   //update profile
   const [updateProfileFormData, setupdateProfileFormData] = useState({
      name: "",
      mobile: "",
      gender: ""
   });

   useEffect(() => {
      if (user) {
         setupdateProfileFormData({
            name: user.name || "",
            mobile: user.mobile || "",
            gender: user.gender || "",
            email: user.email || ""
         });
      }
   }, [user]);

   const handleChange = (e) => {
      setupdateProfileFormData((prev) => ({
         ...prev,
         [e.target.name]: e.target.value
      }))
   }


   const updateProfile = () => {

   }


   return (
      <>
         {/* Profile section */}
         {user && (
            <section className="mx-auto max-w-5xl px-5 py-10">
               <p className="text-[10px] font-bold tracking-widest text-forest">
                  YOUR ORDER JOURNEY
               </p>

               <h1 className="mt-2 font-serif text-4xl font-bold">
                  My Orders
               </h1>
               <div className="mt-8 space-y-6">
                     <section id="orders" className="rounded-3xl bg-white p-6 shadow-soft">

                        <div className="mt-6 space-y-4">
                           {/* Order 1 */}
                           <div className="flex gap-4 rounded-2xl border border-forest/10 p-4">
                              <img
                                 src="/assets/tomato.jpg"
                                 alt="Fresh tomatoes"
                                 className="h-24 w-24 shrink-0 rounded-xl bg-sage object-cover"
                              />

                              <div className="min-w-0 flex-1">
                                 <div className="flex flex-wrap items-center justify-between gap-2">
                                    <p className="text-xs font-bold text-forest">Order #NN1001</p>
                                    <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-semibold text-amber-700">
                                       Processing
                                    </span>
                                 </div>

                                 <p className="mt-2 text-sm font-semibold text-ink">Fresh Tomatoes</p>
                                 <p className="mt-1 text-xs text-ink/60">1 kg · 20 Oct 2026</p>

                                 <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                                    <p className="text-sm font-bold text-forest">₹140</p>
                                    <Link
                                       to="/orderdetails"
                                       className="text-xs font-semibold text-forest hover:underline"
                                    >
                                       View Details →
                                    </Link>
                                 </div>
                              </div>
                           </div>

                           {/* Order 2 */}
                           <div className="flex gap-4 rounded-2xl border border-forest/10 p-4">
                              <img
                                 src="/assets/vegetables.jpg"
                                 alt="Fresh vegetables"
                                 className="h-24 w-24 shrink-0 rounded-xl bg-sage object-cover"
                              />

                              <div className="min-w-0 flex-1">
                                 <div className="flex flex-wrap items-center justify-between gap-2">
                                    <p className="text-xs font-bold text-forest">Order #NN1002</p>
                                    <span className="rounded-full bg-green-100 px-3 py-1 text-[10px] font-semibold text-green-700">
                                       Delivered
                                    </span>
                                 </div>

                                 <p className="mt-2 text-sm font-semibold text-ink">Fresh Vegetables</p>
                                 <p className="mt-1 text-xs text-ink/60">3 items · 18 Oct 2026</p>

                                 <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                                    <p className="text-sm font-bold text-forest">₹220</p>
                                    <Link
                                       to="/orderdetails"
                                       className="text-xs font-semibold text-forest hover:underline"
                                    >
                                       View Details →
                                    </Link>
                                 </div>
                              </div>
                           </div>

                           {/* Order 3 */}
                           <div className="flex gap-4 rounded-2xl border border-forest/10 p-4">
                              <img
                                 src="/assets/banana.jpg"
                                 alt="Fresh bananas"
                                 className="h-24 w-24 shrink-0 rounded-xl bg-sage object-cover"
                              />

                              <div className="min-w-0 flex-1">
                                 <div className="flex flex-wrap items-center justify-between gap-2">
                                    <p className="text-xs font-bold text-forest">Order #NN1003</p>
                                    <span className="rounded-full bg-green-100 px-3 py-1 text-[10px] font-semibold text-green-700">
                                       Delivered
                                    </span>
                                 </div>

                                 <p className="mt-2 text-sm font-semibold text-ink">Fresh Bananas</p>
                                 <p className="mt-1 text-xs text-ink/60">1 dozen · 15 Oct 2026</p>

                                 <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                                    <p className="text-sm font-bold text-forest">₹99</p>
                                    <Link
                                       to="/orderdetails"
                                       className="text-xs font-semibold text-forest hover:underline"
                                    >
                                       View Details →
                                    </Link>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </section>
                  </div>
            </section>

         )}
      </>
   )
}

export default Orders;