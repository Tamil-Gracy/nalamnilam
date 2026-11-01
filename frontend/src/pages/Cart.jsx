
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useCart } from "../context/CartContext";

const API = import.meta.env.VITE_API_URL;

const Cart = () => {
   const navigate = useNavigate();

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
         if (!user) {
            navigate("/login");
         }
      });

      return () => unsubscribe();
   }, [navigate]);

   const { cartItems, updateQuantity, removeFromCart } = useCart();

   const st = cartItems.map((item) => {
      return item.productId?.price * item.quantity
   })


   let subtotal = 0;
   let deliveryFee = 0;
   for (const value of st) {
      subtotal += value;
   }


   if (subtotal >= 500) {
      deliveryFee = 0;
   } else {
      deliveryFee = 40;
   }

   const total = Number(subtotal + deliveryFee);

   
   

   return (
      <>
         <section className="mx-auto min-h-[55vh] max-w-6xl px-4 py-8 sm:px-5 sm:py-10">
            <p className="text-[10px] font-bold tracking-widest text-forest">
               YOUR HARVEST BASKET
            </p>

            <h1 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">
               Shopping Cart
            </h1>

            <div className="mt-8 grid gap-7 lg:grid-cols-[1fr_320px]">
               {/* Cart Items */}
               <section className="min-w-0 rounded-3xl bg-white p-4 shadow-soft sm:p-6 md:p-7">
                  <p className="mb-3 text-xs text-ink/60">
                     {cartItems.length} items in your basket
                  </p>

                  {cartItems.length === 0 ? (
                     <div className="py-10 text-center">
                        <p className="text-sm text-ink/60">
                           Your basket is empty.
                        </p>

                        <Link
                           to="/shop"
                           className="mt-5 inline-block rounded-full bg-forest px-5 py-3 text-xs font-semibold text-white transition hover:bg-leaf"
                        >
                           Continue Shopping →
                        </Link>
                     </div>
                  ) : (
                     cartItems.map((item) => (
                        <div
                           key={item._id}
                           className="flex flex-wrap items-center gap-3 border-b border-forest/10 py-4 last:border-b-0 sm:gap-4 lg:flex-nowrap"
                        >
                           <Link to={`/product/${item.productId?._id}`}>
                              <img
                                 src={`${API}${item.productId?.image} `}
                                 alt={item.productId?.name}
                                 className="h-20 w-20 shrink-0 rounded-xl object-cover"
                              />
                           </Link>
                           <div className="min-w-0 flex-1">
                              <Link to={`/product/${item.productId?._id}`}>
                                 <h2 className="break-words text-xs font-semibold sm:text-sm">
                                    {item.productId?.name}
                                 </h2>
                              </Link>

                              <p className="mt-1 text-[10px] text-ink/60">
                                 {item.productId?.quantity}{" "}
                                 {item.productId?.unit}
                              </p>

                              <p className="mt-2 text-sm font-bold text-forest">
                                 ₹ {item.productId?.price}
                              </p>
                           </div>

                           {/* Quantity */}
                           <div className="inline-flex h-10 shrink-0 items-center rounded-xl border border-forest/15 bg-white">
                              <button
                                 type="button"
                                 aria-label="Decrease quantity"
                                 disabled={item.quantity <= 1}
                                 onClick={() =>
                                    updateQuantity(
                                       item.productId._id,
                                       item.quantity - 1
                                    )
                                 }
                                 className="h-full w-9 text-lg text-forest transition hover:bg-sage disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                 −
                              </button>

                              <span className="min-w-8 text-center text-sm font-semibold">
                                 {item.quantity}
                              </span>

                              <button
                                 type="button"
                                 aria-label="Increase quantity"
                                 onClick={() =>
                                    updateQuantity(
                                       item.productId._id,
                                       item.quantity + 1
                                    )
                                 }
                                 className="h-full w-9 text-lg text-forest transition hover:bg-sage"
                              >
                                 +
                              </button>
                           </div>

                           {/* Item Total */}
                           <span className="shrink-0 text-xs font-semibold subTotal" >
                              ₹
                              {Number(
                                 item.quantity * item.productId?.price
                              )}
                           </span>

                           {/* Remove and Buy Now */}
                           <div className="flex w-full flex-wrap items-center gap-2 lg:w-auto lg:shrink-0">
                              <button
                                 type="button"
                                 onClick={() =>
                                    removeFromCart(item.productId._id)
                                 }
                                 className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 sm:px-4 sm:text-sm cursor-pointer"
                              >
                                 <i className="fa-solid fa-trash"></i>
                                 Remove
                              </button>

                              <button
                                 type="button"
                                 onClick={() => {
                                    navigate("/checkout", {
                                       state: {
                                          items: [
                                             {
                                                productId: item.productId,
                                                quantity: item.quantity,
                                             },
                                          ],
                                          source: "buyNow",
                                       },
                                    });
                                 }}
                                 className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-forest px-3 py-2 text-xs font-semibold text-white transition hover:bg-leaf sm:px-4 sm:text-sm cursor-pointer"
                              >
                                 <i className="fa-solid fa-cart-shopping"></i>
                                 Buy Now
                              </button>
                           </div>
                        </div>
                     ))
                  )}

                  <Link
                     to="/shop"
                     className="mt-5 inline-block text-xs text-forest underline underline-offset-4"
                  >
                     ← Continue shopping
                  </Link>
               </section>

               {/* Order Summary */}
               <aside className="h-fit rounded-3xl bg-sage p-5 sm:p-6">
                  <h2 className="font-serif text-xl font-bold">
                     Order Summary
                  </h2>

                  <div className="mt-5 flex justify-between gap-3 text-xs">
                     <span>Subtotal</span>
                     <span>{subtotal}</span>
                  </div>

                  <div className="mt-3 flex justify-between gap-3 text-xs">
                     <span>Delivery</span>
                     <span>₹{deliveryFee}</span>
                  </div>

                  <p className="mt-3 text-[10px] text-ink/60">
                     Add ₹499 more for free delivery.
                  </p>

                  <hr className="my-5 border-forest/15" />

                  <div className="flex justify-between gap-3 text-sm font-bold">
                     <span>Total</span>
                     <span>₹ {total}</span>
                  </div>

                  <Link
                     onClick={() => {
                        navigate("/checkout", {
                           state: {
                              items: cartItems,
                              source: "cart",
                           },
                        });
                     }}
                     className="mt-6 block w-full rounded-full bg-forest px-5 py-4 text-center text-xs font-semibold text-white transition hover:bg-leaf"
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
   );
};

export default Cart;