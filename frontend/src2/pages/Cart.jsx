import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../config/firebase";
import axios from "axios";

const Cart = () => {
   const navigate = useNavigate();
   useEffect(() => {
      auth.onAuthStateChanged((user) => {
         if (!user) {
            navigate('/');
         }
      })
   }, [navigate]);
   return (
      <>
         <section className="mx-auto min-h-[55vh] max-w-6xl px-5 py-10">
            <p className="text-[10px] font-bold tracking-widest text-forest">
               YOUR HARVEST BASKET
            </p>

            <h1 className="mt-2 font-serif text-4xl font-bold">
               Shopping Cart
            </h1>

            <div className="mt-8 grid gap-7 lg:grid-cols-[1fr_320px]">
               {/* Cart Items */}
               <section className="rounded-3xl bg-white p-5 shadow-soft md:p-7">
                  <p className="mb-3 text-xs text-ink/60">
                     2 items in your basket
                  </p>

                  {/* Tomato */}
                  <div className="flex items-center gap-4 border-b border-forest/10 py-4">
                     <img
                        src="assets/tomato.jpg"
                        alt="Tomato"
                        className="h-20 w-20 rounded-xl object-cover"
                     />

                     <div className="min-w-0 flex-1">
                        <h2 className="text-xs font-semibold">Tomato</h2>
                        <p className="mt-1 text-[10px] text-ink/60">1 kg</p>
                        <p className="mt-2 text-sm font-bold text-forest">
                           ₹ 40
                        </p>
                     </div>

                     <div className="rounded-full border border-forest/15 px-3 py-2 text-xs">
                        − &nbsp; 1 &nbsp; +
                     </div>

                     <span className="text-xs font-semibold">₹ 40</span>
                  </div>

                  {/* Banana */}
                  <div className="flex items-center gap-4 border-b border-forest/10 py-4">
                     <img
                        src="assets/banana.jpg"
                        alt="Banana"
                        className="h-20 w-20 rounded-xl object-cover"
                     />

                     <div className="min-w-0 flex-1">
                        <h2 className="text-xs font-semibold">Banana</h2>
                        <p className="mt-1 text-[10px] text-ink/60">1 kg</p>
                        <p className="mt-2 text-sm font-bold text-forest">
                           ₹ 60
                        </p>
                     </div>

                     <div className="rounded-full border border-forest/15 px-3 py-2 text-xs">
                        − &nbsp; 1 &nbsp; +
                     </div>

                     <span className="text-xs font-semibold">₹ 60</span>
                  </div>

                  <Link
                     to="/shop"
                     className="mt-5 inline-block text-xs text-forest underline"
                  >
                     ← Continue shopping
                  </Link>
               </section>

               {/* Order Summary */}
               <aside className="h-fit rounded-3xl bg-sage p-6">
                  <h2 className="font-serif text-xl font-bold">
                     Order Summary
                  </h2>

                  <div className="mt-5 flex justify-between text-xs">
                     <span>Subtotal</span>
                     <span>₹ 100</span>
                  </div>

                  <div className="mt-3 flex justify-between text-xs">
                     <span>Delivery</span>
                     <span>₹ 40</span>
                  </div>

                  <p className="mt-3 text-[10px] text-ink/60">
                     Add ₹399 more for free delivery.
                  </p>

                  <hr className="my-5 border-forest/15" />

                  <div className="flex justify-between text-sm font-bold">
                     <span>Total</span>
                     <span>₹ 140</span>
                  </div>

                  <Link
                     to="/checkout"
                     className="mt-6 w-full rounded-full bg-forest px-5 py-4 text-xs font-semibold text-white text-center block"
                  >
                     Proceed to Checkout →
                  </Link>

                  <p className="mt-3 text-center text-[10px] text-ink/55">
                     Secure checkout · Freshness guaranteed
                  </p>
               </aside>
            </div>
         </section>
      </>
   )
}

export default Cart;