import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import axios from 'axios';



const API = import.meta.env.VITE_API_URL;

const Checkout = () => {
   const navigate = useNavigate();
   const userData = useUser();
   const user = userData.user;

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
         if (!user) {
            navigate("/login");
         }
      });

      return () => unsubscribe();
   }, [navigate]);


   const location = useLocation();
   const source = location.state?.source || "cart";

   const [message, setMessage] = useState("");
   const [messageType, setMessageType] = useState("success");
   const [popup, setPopup] = useState("");

   const { removeFromCart } = useCart();
   
      // Close popup
      const closePopup = () => {
         setPopup("");
         navigate("/orders")
      };
   
      // Show success or error popup
      const showMessage = (type, text) => {
         setMessageType(type);  
         setMessage(text);
         setPopup("message");
      };
   

   const [checkoutItems, setCheckoutItems] = useState(() =>
      (location.state?.items || []).map((item) => ({
         ...item,
         quantity: item.quantity || 1,
      }))
   );

   const [formData, setFormData] = useState({
      name: "",
      mobile: "",
      email: "",
      house: "",
      street: "",
      city: "",
      pincode: "",
      paymentType: "cod"

   })
   
   useEffect(() => {
      if (user) {
         setFormData((prev) => ({
            ...prev,
            name: user.name || "",
            mobile: user.mobile || "",
            email: user.email || "",
            paymentType: "COD" || "",
         }));
      }
   }, [user]);

   //console.log(checkoutItems)
   const updateCheckoutQuantity = (productId, change) => {
      setCheckoutItems((prevItems) => {
         return prevItems.map((item) => {

            // Check whether this is the selected product
            if (item.productId?._id === productId) {

               // Calculate the new quantity
               const newQuantity = item.quantity + change;

               // Prevent quantity from going below 1
               if (newQuantity < 1) {
                  return item;
               }

               // Return the product with updated quantity
               return {
                  ...item,
                  quantity: newQuantity,
               };
            }

            // Keep other products unchanged
            return item;
         });
      });
   };


   let subtotal = 0;
   let deliveryFee = 0;
   let discount = 0;

   for (let i = 0; i < checkoutItems.length; i++) {
      subtotal +=
         Number(checkoutItems[i].productId?.price || 0) *
         checkoutItems[i].quantity;
      discount += Number(checkoutItems[i].productId?.discountPrice || 0)
   }

   if (subtotal === 0 || subtotal >= 500) {
      deliveryFee = 0;
   } else {
      deliveryFee = 40;
   }

   const total = (subtotal - discount) + deliveryFee;

   //place order

   const handlePlaceOrder = async (e) => {
      e.preventDefault();

      if (checkoutItems.length === 0) {
         showMessage("error", "Your order has no products.");
         return;
      }

      if (
         !formData.name.trim() ||
         !formData.mobile.trim() ||
         !formData.house.trim() ||
         !formData.street.trim() ||
         !formData.city.trim() ||
         !formData.pincode.trim() ||
         !formData.paymentType
      ) {
         showMessage("error", "Please fill in all required fields.");
         return;
      }

      try {
         const orderData = {
            firebaseUid: user?.firebaseUid,
            items: checkoutItems.map((item) => ({
               productId: item.productId._id,
               quantity: item.quantity,
               name: item.productId?.name,
               image: item.productId?.image,
               price: item.productId?.price,
            })),
            customer: {
               name: formData.name,
               mobile: formData.mobile,
               email: formData.email,
            },
            address: {
               house: formData.house,
               street: formData.street,
               city: formData.city,
               state: formData.state,
               pincode: formData.pincode,
               instruction: "",
            },
            paymentMethod: formData.paymentType.toUpperCase(),
            paymentStatus: "Pending",
            subtotal,
            discount,
            deliveryFee,
            total,
            orderStatus: "Placed",
         };

         const response = await axios.post(
            `${API}/api/orders`,
            orderData
         );
         //clear items on checkout
         setCheckoutItems([]);
         //remove items from cart if order placed from cart 
         checkoutItems.map((item) => {
            const removeres = removeFromCart(item.productId._id)
         })
         showMessage(
            "success",
            response.data.message || "Order placed successfully!"
         );
      } catch (err) {
         console.log(err);

         showMessage(
            "error",
            err.response?.data?.message || "Failed to place order. Please try again."
         );
      }
   };

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

            {/* Checkout Steps
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
            </div> */}

            <div>
               <form className="checkOutForm" onSubmit={handlePlaceOrder}>
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
                                 value={formData.name}
                                 onChange={(e) => {
                                    setFormData((prev) => ({
                                       ...prev,
                                       name:e.target.value
                                    }))
                                 }}
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
                                 value={formData.mobile}
                                 onChange={(e) => {
                                    setFormData((prev) => ({
                                       ...prev,
                                       mobile: e.target.value
                                    }))
                                 }}
                              />
                           </label>

                           <label className="grid gap-2 text-xs font-medium sm:col-span-2">
                              Email Address
                              <input
                                 type="email"
                                 placeholder="you@example.com"
                                 className="rounded-xl border border-forest/15 px-4 py-3 text-sm font-normal outline-none focus:border-forest"
                                 value={formData.email}
                                 onChange={(e) => {
                                    setFormData((prev) => ({
                                       ...prev,
                                       email: e.target.value
                                    }))
                                 }}
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
                                 value={formData.house}
                                 onChange={(e) => {
                                    setFormData((prev) => ({
                                       ...prev,
                                       house: e.target.value
                                    }))
                                 }}
                              />
                           </label>

                           <label className="grid gap-2 text-xs font-medium sm:col-span-2">
                              Street / Area *
                              <input
                                 type="text"
                                 required
                                 placeholder="Street, area or landmark"
                                 className="rounded-xl border border-forest/15 px-4 py-3 text-sm font-normal outline-none focus:border-forest"
                                 value={formData.street}
                                 onChange={(e) => {
                                    setFormData((prev) => ({
                                       ...prev,
                                       street: e.target.value
                                    }))
                                 }}
                              />
                           </label>

                           <label className="grid gap-2 text-xs font-medium">
                              City / Town *
                              <input
                                 type="text"
                                 required
                                 placeholder="Enter your town"
                                 className="rounded-xl border border-forest/15 px-4 py-3 text-sm font-normal outline-none focus:border-forest"
                                 value={formData.city}
                                 onChange={(e) => {
                                    setFormData((prev) => ({
                                       ...prev,
                                       city: e.target.value
                                    }))
                                 }}
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
                                 value={formData.pincode}
                                 onChange={(e) => {
                                    setFormData((prev) => ({
                                       ...prev,
                                       pincode: e.target.value
                                    }))
                                 }}
                              />
                           </label>

                        </div>
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
                                 name="paymentType"
                                    value="UPI"
                                 className="accent-[#174b32]"
                                    checked={formData.paymentType == 'UPI'}
                                 onChange={(e) => {
                                    setFormData((prev) => ({
                                       ...prev,
                                       paymentType: e.target.value
                                    }))
                                 }}
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
                                 name="paymentType"
                                    value="Card"
                                 className="accent-[#174b32]"
                                    checked={formData.paymentType == 'Card'}
                                 onChange={(e) => {
                                    setFormData((prev) => ({
                                       ...prev,
                                       paymentType: e.target.value
                                    }))
                                 }}
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
                                 name="paymentType"
                                    value="COD"
                                 className="accent-[#174b32]"
                                    checked={formData.paymentType == 'COD'}
                                 onChange={(e) => {
                                    setFormData((prev) => ({
                                       ...prev,
                                       paymentType: e.target.value
                                    }))
                                 }}
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
                        Pure Organic Goodness, Delivered to You
                     </p>


                     {checkoutItems.map((item) => (
                        <div
                           className="mt-6 flex items-center gap-3 border-b border-forest/10 pb-4"
                           key={item.productId?._id}
                        >
                           <img
                              src={`${API}${item.productId?.image}`}
                              alt={item.productId?.name}
                              className="h-16 w-16 rounded-xl object-cover"
                           />

                           <div className="min-w-0 flex-1">
                              <h3 className="text-xs font-semibold">
                                 {item.productId?.name}
                              </h3>

                              <p className="mt-1 text-[10px] text-ink/60">
                                 {item.productId?.quantity} {item.productId?.unit}
                              </p>

                              {/* Quantity buttons: add them here */}
                              <div className="mt-2 flex items-center gap-3">
                                 <button
                                    type="button"
                                    onClick={() =>
                                       updateCheckoutQuantity(item.productId._id, -1)
                                    }
                                    disabled={item.quantity <= 1}
                                    className="grid h-7 w-7 place-items-center rounded-full border border-forest/20 disabled:opacity-40"
                                 >
                                    −
                                 </button>

                                 <span className="text-xs font-semibold">
                                    {item.quantity}
                                 </span>

                                 <button
                                    type="button"
                                    onClick={() =>
                                       updateCheckoutQuantity(item.productId._id, 1)
                                    }
                                    className="grid h-7 w-7 place-items-center rounded-full border border-forest/20"
                                 >
                                    +
                                 </button>
                              </div>
                           </div>

                           <span className="text-xs font-semibold">
                              ₹{Number(item.productId?.price || 0) * item.quantity}
                           </span>

                        </div>
                     ))}


                     {/* Price Details */}
                     <div className="mt-5 space-y-3 text-xs">
                        <div className="flex justify-between">
                           <span>Subtotal</span>
                           <span>₹{subtotal}</span>
                        </div>

                        <div className="flex justify-between">
                           <span>Delivery fee</span>
                           <span>₹{deliveryFee}</span>
                        </div>

                        <div className="flex justify-between text-forest">
                           <span>Discount</span>
                           <span>₹{discount}</span>
                        </div>
                     </div>

                     <hr className="my-5 border-forest/15" />

                     <div className="flex items-center justify-between">
                        <span className="font-serif text-lg font-bold">
                           Total
                        </span>
                        <span className="text-2xl font-bold text-forest">
                           ₹{total}
                        </span>
                     </div>

                     <p className="mt-2 text-[10px] text-ink/60">
                        Inclusive of applicable charges.
                     </p>

                     <button
                        type="submit"
                        className="mt-6 w-full rounded-full bg-forest px-5 py-4 text-xs font-semibold text-white transition hover:bg-leaf cursor-pointer"
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
               </form>
            </div>
            {/* Success and Error Popup */}
            {popup === "message" && (
               <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 p-4">
                  <div className="w-full max-w-sm rounded-2xl bg-[#FBF8EF] p-6 text-center shadow-xl">
                     <div
                        className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-2xl font-bold ${messageType === "success"
                           ? "bg-green-100 text-[#315C3B]"
                           : "bg-red-100 text-red-600"
                           }`}
                     >
                        {messageType === "success" ? "✓" : "!"}
                     </div>

                     <h2
                        className={`text-xl font-bold ${messageType === "success"
                           ? "text-[#174B32]"
                           : "text-red-600"
                           }`}
                     >
                        {messageType === "success" ? "Success!" : "Error!"}
                     </h2>

                     <p className="mt-3 text-sm leading-6 text-stone-600">
                        {message}
                     </p>

                     <button
                        type="button"
                        onClick={closePopup}
                        className="mt-6 w-full rounded-xl bg-[#315C3B] px-5 py-3 text-sm font-semibold text-white hover:bg-[#26492E] cursor-pointer"
                     >
                        OK
                     </button>
                  </div>
               </div>
            )}
         </div>
      </>
   )
}

export default Checkout;