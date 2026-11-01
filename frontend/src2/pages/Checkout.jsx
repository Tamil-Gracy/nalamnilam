import { Link } from "react-router-dom";

const Checkout = () => {
   return (
      <>
         <div className="mx-auto max-w-6xl px-5 py-10">
            <p className="text-[10px] font-bold tracking-widest text-forest">
               ALMOST THERE!
            </p>

            <h1 className="mt-2 font-serif text-4xl font-bold">
               Checkout
            </h1>

            <p className="mt-2 text-sm text-ink/60">
               Fresh from local farms, delivered to your doorstep.
            </p>

            {/* Checkout Steps */}
            <div className="mt-7 flex flex-wrap items-center gap-3 text-xs">
               <span className="rounded-full bg-forest px-4 py-2 font-medium text-white">
                  1. Delivery Details
               </span>
               <span className="text-ink/30">→</span>
               <span className="rounded-full bg-sage px-4 py-2 text-forest">
                  2. Payment
               </span>
               <span className="text-ink/30">→</span>
               <span className="rounded-full bg-sage px-4 py-2 text-forest">
                  3. Confirmation
               </span>
            </div>

            <div className="mt-8 grid gap-7 lg:grid-cols-[1fr_350px]">
               {/* Left Side */}
               <div className="space-y-6">
                  {/* Contact Details */}
                  <section className="rounded-3xl bg-white p-6 shadow-soft md:p-8">
                     <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-sage text-lg">
                           ♙
                        </span>
                        <div>
                           <h2 className="font-serif text-xl font-bold">
                              Contact Details
                           </h2>
                           <p className="mt-1 text-[11px] text-ink/60">
                              Where can we reach you?
                           </p>
                        </div>
                     </div>

                     <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <label className="grid gap-2 text-xs font-medium">
                           Full Name *
                           <input
                              type="text"
                              required
                              placeholder="Enter your full name"
                              className="rounded-xl border border-forest/15 px-4 py-3 text-sm font-normal outline-none focus:border-forest"
                           />
                        </label>

                        <label className="grid gap-2 text-xs font-medium">
                           Phone Number *
                           <input
                              type="tel"
                              required
                              maxLength={10}
                              placeholder="10-digit mobile number"
                              className="rounded-xl border border-forest/15 px-4 py-3 text-sm font-normal outline-none focus:border-forest"
                           />
                        </label>

                        <label className="grid gap-2 text-xs font-medium sm:col-span-2">
                           Email Address
                           <input
                              type="email"
                              placeholder="you@example.com"
                              className="rounded-xl border border-forest/15 px-4 py-3 text-sm font-normal outline-none focus:border-forest"
                           />
                        </label>
                     </div>
                  </section>

                  {/* Delivery Address */}
                  <section className="rounded-3xl bg-white p-6 shadow-soft md:p-8">
                     <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-sage text-lg">
                           📍
                        </span>
                        <div>
                           <h2 className="font-serif text-xl font-bold">
                              Delivery Address
                           </h2>
                           <p className="mt-1 text-[11px] text-ink/60">
                              Tell us where to deliver your harvest.
                           </p>
                        </div>
                     </div>

                     <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <label className="grid gap-2 text-xs font-medium sm:col-span-2">
                           House / Flat / Building *
                           <input
                              type="text"
                              required
                              placeholder="House number, building name"
                              className="rounded-xl border border-forest/15 px-4 py-3 text-sm font-normal outline-none focus:border-forest"
                           />
                        </label>

                        <label className="grid gap-2 text-xs font-medium sm:col-span-2">
                           Street / Area *
                           <input
                              type="text"
                              required
                              placeholder="Street, area or landmark"
                              className="rounded-xl border border-forest/15 px-4 py-3 text-sm font-normal outline-none focus:border-forest"
                           />
                        </label>

                        <label className="grid gap-2 text-xs font-medium">
                           City / Town *
                           <input
                              type="text"
                              required
                              placeholder="Enter your town"
                              className="rounded-xl border border-forest/15 px-4 py-3 text-sm font-normal outline-none focus:border-forest"
                           />
                        </label>

                        <label className="grid gap-2 text-xs font-medium">
                           PIN Code *
                           <input
                              type="text"
                              inputMode="numeric"
                              maxLength={6}
                              required
                              placeholder="6-digit PIN code"
                              className="rounded-xl border border-forest/15 px-4 py-3 text-sm font-normal outline-none focus:border-forest"
                           />
                        </label>

                        <label className="grid gap-2 text-xs font-medium sm:col-span-2">
                           Delivery Instructions (Optional)
                           <textarea
                              rows={3}
                              placeholder="Nearby landmark, gate instructions, etc."
                              className="resize-none rounded-xl border border-forest/15 px-4 py-3 text-sm font-normal outline-none focus:border-forest"
                           />
                        </label>
                     </div>
                  </section>

                  {/* Delivery Slot */}
                  <section className="rounded-3xl bg-white p-6 shadow-soft md:p-8">
                     <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-sage text-lg">
                           🕒
                        </span>
                        <div>
                           <h2 className="font-serif text-xl font-bold">
                              Choose Delivery Slot
                           </h2>
                           <p className="mt-1 text-[11px] text-ink/60">
                              Choose a convenient time to receive your order.
                           </p>
                        </div>
                     </div>

                     <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-forest/20 p-4 transition hover:bg-sage/50">
                           <input
                              type="radio"
                              name="deliverySlot"
                              value="morning"
                              defaultChecked
                              className="mt-1 accent-[#174b32]"
                           />
                           <span>
                              <span className="block text-sm font-semibold">
                                 ☀️ Morning
                              </span>
                              <span className="mt-1 block text-xs text-ink/60">
                                 7:00 AM – 10:00 AM
                              </span>
                           </span>
                        </label>

                        <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-forest/20 p-4 transition hover:bg-sage/50">
                           <input
                              type="radio"
                              name="deliverySlot"
                              value="evening"
                              className="mt-1 accent-[#174b32]"
                           />
                           <span>
                              <span className="block text-sm font-semibold">
                                 🌤️ Evening
                              </span>
                              <span className="mt-1 block text-xs text-ink/60">
                                 4:00 PM – 7:00 PM
                              </span>
                           </span>
                        </label>
                     </div>

                     <p className="mt-4 text-[10px] leading-5 text-ink/60">
                        Delivery slots are subject to availability in your area.
                     </p>
                  </section>

                  {/* Payment Method */}
                  <section className="rounded-3xl bg-white p-6 shadow-soft md:p-8">
                     <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-sage text-lg">
                           💳
                        </span>
                        <div>
                           <h2 className="font-serif text-xl font-bold">
                              Payment Method
                           </h2>
                           <p className="mt-1 text-[11px] text-ink/60">
                              Select how you would like to pay.
                           </p>
                        </div>
                     </div>

                     <div className="mt-6 grid gap-3">
                        <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-forest/20 p-4 hover:bg-sage/50">
                           <input
                              type="radio"
                              name="payment"
                              value="upi"
                              defaultChecked
                              className="accent-[#174b32]"
                           />
                           <span className="text-xl">📱</span>
                           <span className="flex-1">
                              <span className="block text-sm font-semibold">
                                 UPI Payment
                              </span>
                              <span className="mt-1 block text-[10px] text-ink/60">
                                 Google Pay, PhonePe, Paytm
                              </span>
                           </span>
                        </label>

                        <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-forest/20 p-4 hover:bg-sage/50">
                           <input
                              type="radio"
                              name="payment"
                              value="card"
                              className="accent-[#174b32]"
                           />
                           <span className="text-xl">💳</span>
                           <span className="flex-1">
                              <span className="block text-sm font-semibold">
                                 Credit / Debit Card
                              </span>
                              <span className="mt-1 block text-[10px] text-ink/60">
                                 Pay securely using your card
                              </span>
                           </span>
                        </label>

                        <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-forest/20 p-4 hover:bg-sage/50">
                           <input
                              type="radio"
                              name="payment"
                              value="cod"
                              className="accent-[#174b32]"
                           />
                           <span className="text-xl">💵</span>
                           <span className="flex-1">
                              <span className="block text-sm font-semibold">
                                 Cash on Delivery
                              </span>
                              <span className="mt-1 block text-[10px] text-ink/60">
                                 Pay when your order arrives
                              </span>
                           </span>
                        </label>
                     </div>
                  </section>
               </div>

               {/* Right Side: Order Summary */}
               <aside className="h-fit rounded-3xl bg-sage p-6 lg:sticky lg:top-24">
                  <h2 className="font-serif text-2xl font-bold">
                     Your Order
                  </h2>

                  <p className="mt-1 text-xs text-ink/60">
                     Fresh picks from local farms.
                  </p>

                  {/* Product 1 */}
                  <div className="mt-6 flex items-center gap-3 border-b border-forest/10 pb-4">
                     <img
                        src="assets/tomato.jpg"
                        alt="Tomato"
                        className="h-16 w-16 rounded-xl object-cover"
                     />

                     <div className="min-w-0 flex-1">
                        <h3 className="text-xs font-semibold">Tomato</h3>
                        <p className="mt-1 text-[10px] text-ink/60">1 kg × 1</p>
                     </div>

                     <span className="text-xs font-semibold">₹40</span>
                  </div>

                  {/* Product 2 */}
                  <div className="flex items-center gap-3 border-b border-forest/10 py-4">
                     <img
                        src="assets/banana.jpg"
                        alt="Banana"
                        className="h-16 w-16 rounded-xl object-cover"
                     />

                     <div className="min-w-0 flex-1">
                        <h3 className="text-xs font-semibold">Banana</h3>
                        <p className="mt-1 text-[10px] text-ink/60">1 kg × 1</p>
                     </div>

                     <span className="text-xs font-semibold">₹60</span>
                  </div>

                  {/* Price Details */}
                  <div className="mt-5 space-y-3 text-xs">
                     <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹100</span>
                     </div>

                     <div className="flex justify-between">
                        <span>Delivery fee</span>
                        <span>₹40</span>
                     </div>

                     <div className="flex justify-between text-forest">
                        <span>Discount</span>
                        <span>₹0</span>
                     </div>
                  </div>

                  <hr className="my-5 border-forest/15" />

                  <div className="flex items-center justify-between">
                     <span className="font-serif text-lg font-bold">
                        Total
                     </span>
                     <span className="text-2xl font-bold text-forest">
                        ₹140
                     </span>
                  </div>

                  <p className="mt-2 text-[10px] text-ink/60">
                     Inclusive of applicable charges.
                  </p>

                  <button
                     type="button"
                     className="mt-6 w-full rounded-full bg-forest px-5 py-4 text-xs font-semibold text-white transition hover:bg-leaf"
                  >
                     Place Order →
                  </button>

                  <p className="mt-4 text-center text-[10px] leading-5 text-ink/60">
                     🔒 Your information is protected.
                     <br />
                     Thank you for supporting local farmers!
                  </p>

                  <Link
                     to="/cart"
                     className="mt-5 block text-center text-xs text-forest underline"
                  >
                     ← Back to cart
                  </Link>
               </aside>
            </div>
         </div>
      </>
   )
}

export default Checkout;