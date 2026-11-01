import { Link } from "react-router-dom";
const OrderDetails = () => {
   return (
      <>
         <div className="mx-auto max-w-5xl px-5 py-10">
            <Link
               to="/orders"
               className="text-sm font-medium text-green-700 hover:text-green-900"
            >
               ← Back to My Orders
            </Link>

            <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
               <div>
                  <p className="text-sm text-gray-500">Order #NN10284</p>
                  <h1 className="mt-2 text-3xl font-bold md:text-4xl">
                     Order Details
                  </h1>
                  <p className="mt-2 text-sm text-gray-500">
                     Placed on 20 October 2026
                  </p>
               </div>

               <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800">
                  Processing
               </span>
            </div>

            {/* Track Your Order */}
            <section className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
               <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                     <h2 className="text-2xl font-bold">Track Your Order</h2>
                     <p className="mt-2 text-sm text-gray-500">
                        Your fresh produce, from farm to doorstep.
                     </p>
                  </div>

                  <span className="rounded-full bg-green-50 px-3 py-2 text-xs font-medium text-green-800">
                     Estimated: Today, 6 PM – 8 PM
                  </span>
               </div>

               <div className="mt-8 space-y-0">
                  {/* Order Placed */}
                  <div className="flex gap-4">
                     <div className="flex flex-col items-center">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-700 text-white">
                           ✓
                        </div>
                        <div className="min-h-16 w-0.5 bg-green-600"></div>
                     </div>

                     <div className="pb-8">
                        <h3 className="font-semibold">Order Placed</h3>
                        <p className="mt-1 text-sm text-gray-500">
                           Your order has been received successfully.
                        </p>
                        <p className="mt-2 text-xs font-medium text-green-700">
                           20 October 2026
                        </p>
                     </div>
                  </div>

                  {/* Order Confirmed */}
                  <div className="flex gap-4">
                     <div className="flex flex-col items-center">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-green-100 bg-green-700 text-sm font-bold text-white">
                           2
                        </div>
                        <div className="min-h-16 w-0.5 bg-gray-200"></div>
                     </div>

                     <div className="pb-8">
                        <div className="flex flex-wrap items-center gap-2">
                           <h3 className="font-semibold">Order Confirmed</h3>
                           <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                              Current Status
                           </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                           Your order is confirmed and being prepared.
                        </p>
                     </div>
                  </div>

                  {/* Packed and Ready */}
                  <div className="flex gap-4">
                     <div className="flex flex-col items-center">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-gray-200 bg-white text-sm text-gray-400">
                           3
                        </div>
                        <div className="min-h-16 w-0.5 bg-gray-200"></div>
                     </div>

                     <div className="pb-8">
                        <h3 className="font-semibold text-gray-500">
                           Packed and Ready
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                           Your fresh items will be packed carefully.
                        </p>
                     </div>
                  </div>

                  {/* Out for Delivery */}
                  <div className="flex gap-4">
                     <div className="flex flex-col items-center">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-gray-200 bg-white text-sm text-gray-400">
                           4
                        </div>
                        <div className="min-h-16 w-0.5 bg-gray-200"></div>
                     </div>

                     <div className="pb-8">
                        <h3 className="font-semibold text-gray-500">
                           Out for Delivery
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                           Your order will be on its way to your address.
                        </p>
                     </div>
                  </div>

                  {/* Delivered */}
                  <div className="flex gap-4">
                     <div className="flex flex-col items-center">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-gray-200 bg-white text-sm text-gray-400">
                           5
                        </div>
                     </div>

                     <div>
                        <h3 className="font-semibold text-gray-500">Delivered</h3>
                        <p className="mt-1 text-sm text-gray-500">
                           Fresh goodness delivered to your doorstep.
                        </p>
                     </div>
                  </div>
               </div>
            </section>

            {/* Items Ordered */}
            <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
               <h2 className="text-2xl font-bold">Items Ordered</h2>

               <div className="mt-6 space-y-5">
                  <div className="flex items-center gap-4">
                     <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-green-50 text-4xl">
                        🥬
                     </div>

                     <div className="flex-1">
                        <h3 className="font-semibold">Fresh Green Vegetables</h3>
                        <p className="mt-1 text-sm text-gray-500">
                           Spinach, beans, cabbage
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                           Quantity: 1 basket
                        </p>
                     </div>

                     <p className="font-semibold">₹199</p>
                  </div>

                  <div className="flex items-center gap-4">
                     <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-4xl">
                        🍅
                     </div>

                     <div className="flex-1">
                        <h3 className="font-semibold">Farm Fresh Tomatoes</h3>
                        <p className="mt-1 text-sm text-gray-500">
                           Locally harvested
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                           Quantity: 1 kg
                        </p>
                     </div>

                     <p className="font-semibold">₹40</p>
                  </div>
               </div>

               {/* Price Summary */}
               <div className="mt-7 border-t border-gray-100 pt-5">
                  <div className="flex justify-between py-2 text-sm">
                     <span className="text-gray-500">Subtotal</span>
                     <span>₹239</span>
                  </div>

                  <div className="flex justify-between py-2 text-sm">
                     <span className="text-gray-500">Delivery Fee</span>
                     <span className="font-medium text-green-700">Free</span>
                  </div>

                  <div className="mt-3 flex justify-between border-t border-gray-100 pt-4">
                     <span className="font-semibold">Total Amount</span>
                     <span className="text-xl font-bold">₹239</span>
                  </div>
               </div>
            </section>

            {/* Delivery Address and Payment */}
            <section className="mt-6 grid gap-6 md:grid-cols-2">
               <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-bold">Delivery Address</h2>
                  <p className="mt-5 font-semibold">Tamil</p>
                  <p className="mt-2 text-sm leading-7 text-gray-500">
                     12, Green Garden Street,
                     <br />
                     Tiruppur, Tamil Nadu – 641601
                     <br />
                     India
                  </p>
                  <p className="mt-3 text-sm text-gray-500">
                     Phone: +91 XXXXX XXXXX
                  </p>
               </div>

               <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-bold">Payment Information</h2>

                  <div className="mt-5 flex justify-between text-sm">
                     <span className="text-gray-500">Payment Method</span>
                     <span className="font-medium">UPI</span>
                  </div>

                  <div className="mt-4 flex justify-between text-sm">
                     <span className="text-gray-500">Payment Status</span>
                     <span className="font-semibold text-green-700">Paid</span>
                  </div>

                  <div className="mt-4 flex justify-between border-t border-gray-100 pt-4">
                     <span className="font-semibold">Amount Paid</span>
                     <span className="font-bold">₹239</span>
                  </div>
               </div>
            </section>

            {/* Bottom Actions */}
            <div className="mt-8 flex flex-wrap gap-3">
               <Link
                  to="/orders"
                  className="rounded-full bg-green-800 px-6 py-3 text-sm font-semibold text-white hover:bg-green-900"
               >
                  ← Back to Orders
               </Link>

               <Link
                  to="/shop"
                  className="rounded-full border border-green-800 px-6 py-3 text-sm font-semibold text-green-800 hover:bg-green-50"
               >
                  Continue Shopping
               </Link>
            </div>
         </div>
      </>
   );
};

export default OrderDetails;
