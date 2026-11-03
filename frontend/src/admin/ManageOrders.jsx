
import { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";

const API = import.meta.env.VITE_API_URL;

const statusStyles = {
   Placed: "bg-stone-100 text-stone-700",
   Packed: "bg-blue-100 text-blue-800",
   Shipped: "bg-amber-100 text-amber-800",
   "Out for delivery": "bg-purple-100 text-purple-800",
   Delivered: "bg-green-100 text-green-800",
   Cancelled: "bg-red-100 text-red-700",
};

const Orders = () => {
   const [orders, setOrders] = useState([]);
   const [selectedOrder, setSelectedOrder] = useState(null);


   // Fetch orders
   const fetchOrders = async () => {
      try {
         const res = await axios.get(`${API}/api/orders`);
         setOrders(res.data.data);
         } catch (err) {
            console.log("Error fetching orders:", err.response?.data);
         }
      };
   
      useEffect(() => {
         fetchOrders();
      }, []);
   
   const newOrdersCount = orders.filter((order) => order.orderStatus === "Placed").length;
   const shippedOrderCount = orders.filter((order) => order.orderStatus === "Shipped").length;
   const outForDeliveryCount = orders.filter((order) => order.orderStatus === "Out for Delivery").length;
   const deliveredCount = orders.filter((order) => order.orderStatus === "Delivered").length;
   
   
   const inputStyle =
      "rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#315C3B]";

   const closePopup = () => setSelectedOrder(null);

   return (
      <div className="min-h-screen lg:grid lg:grid-cols-[250px_1fr]">
         <SideBar />

         <div className="min-w-0">
            <TopBar />

            <main className="p-5 sm:p-8">
               {/* Page Header */}
               <div className="mb-6">
                  <h1 className="text-2xl font-bold text-stone-800">
                     Orders
                  </h1>
                  <p className="mt-1 text-sm text-stone-500">
                     Review customer orders and manage their delivery status.
                  </p>
               </div>

               {/* Summary Cards */}
               <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <div className="rounded-2xl border border-stone-200 bg-white p-5">
                     <p className="text-sm text-stone-500">New Orders</p>
                     <p className="mt-2 text-3xl font-bold text-[#1F3827]">{newOrdersCount}</p>
                     <p className="mt-2 text-xs text-stone-500">Needs review</p>
                  </div>

                  <div className="rounded-2xl border border-stone-200 bg-white p-5">
                     <p className="text-sm text-stone-500">Shipped</p>
                     <p className="mt-2 text-3xl font-bold text-[#1F3827]">{shippedOrderCount}</p>
                     <p className="mt-2 text-xs text-stone-500">Picked and packed</p>
                  </div>

                  <div className="rounded-2xl border border-stone-200 bg-white p-5">
                     <p className="text-sm text-stone-500">Out for Delivery</p>
                     <p className="mt-2 text-3xl font-bold text-[#1F3827]">{outForDeliveryCount}</p>
                     <p className="mt-2 text-xs text-stone-500">In transit</p>
                  </div>
                  <div className="rounded-2xl border border-stone-200 bg-white p-5">
                     <p className="text-sm text-stone-500">Delivered</p>
                     <p className="mt-2 text-3xl font-bold text-[#1F3827]">{deliveredCount}</p>
                     <p className="mt-2 text-xs text-stone-500">Completed</p>
                  </div>
               </div>

               {/* Search and Filters - UI Only */}
               <div className="mt-6 flex flex-wrap gap-3">
                  <input
                     type="text"
                     placeholder="Search order ID or customer"
                     className={`${inputStyle} min - w - [220px] flex - 1`}
                  />

                  <select defaultValue="All" className={inputStyle}>
                     <option value="All">All statuses</option>
                     <option value="Placed">Placed</option>
                     <option value="Packed">Packed</option>
                     <option value="Shipped">Shipped</option>
                     <option value="Out for Delivery">Out for Delivery</option>
                     <option value="Delivered">Delivered</option>
                     <option value="Cancelled">Cancelled</option>
                  </select>
               </div>

               {/* Orders Table */}
               <div className="mt-5 overflow-x-auto rounded-2xl border border-stone-200 bg-white">
                  <table className="w-full min-w-[700px] text-left text-sm">
                     <thead className="bg-stone-50 text-xs uppercase tracking-wider text-stone-500">
                        <tr>
                           <th className="px-5 py-4">Order ID</th>
                           <th className="px-5 py-4">Customer</th>
                           <th className="px-5 py-4">Total</th>
                           <th className="px-5 py-4">Payment</th>
                           <th className="px-5 py-4">Status</th>
                           <th className="px-5 py-4">Action</th>
                        </tr>
                     </thead>

                     <tbody>
                        {orders.map((order) => (
                           <tr
                              key={order._id}
                              className="border-t border-stone-100 transition hover:bg-stone-50"
                           >
                              <td className="px-5 py-4 font-semibold text-stone-800">
                                 {order._id}
                              </td>

                              <td className="px-5 py-4">{order.customer?.name}</td>

                              <td className="px-5 py-4 font-medium">
                                 ₹{order.total.toLocaleString("en-IN")}
                              </td>

                              <td className="px-5 py-4">{order.payment}</td>

                              <td className="px-5 py-4">
                                 <span
                                    className={`whitespace - nowrap rounded - full px - 3 py - 1 text - xs font - bold ${statusStyles[order.status]
                                       } `}
                                 >
                                    {order.status}
                                 </span>
                              </td>

                              <td className="px-5 py-4">
                                 <button
                                    type="button"
                                    onClick={() => setSelectedOrder(order)}
                                    className="font-bold text-[#315C3B] hover:underline"
                                 >
                                    Open
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>

               {/* Processing Note */}
               <div className="mt-6 rounded-2xl bg-[#DCE9C9] p-5 text-sm leading-6 text-[#315C3B]">
                  <strong>Processing rule:</strong> Verify stock and payment,
                  confirm the order, pick and pack items, dispatch for delivery,
                  then mark Delivered after handover.
               </div>
            </main>
         </div>

         {/* ORDER DETAILS / UPDATE POPUP - UI ONLY */}
         {selectedOrder && (
            <div
               className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
               onMouseDown={(e) => {
                  if (e.target === e.currentTarget) closePopup();
               }}
            >
               <div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="order-popup-title"
                  className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
               >
                  {/* Popup Header */}
                  <div className="flex items-start justify-between border-b border-stone-100 p-6">
                     <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#315C3B]">
                           Order Details
                        </p>
                        <h2
                           id="order-popup-title"
                           className="mt-1 text-xl font-bold text-stone-800"
                        >
                           {selectedOrder.id}
                        </h2>
                        <p className="mt-1 text-sm text-stone-500">
                           Placed on {selectedOrder.date}
                        </p>
                     </div>

                     <button
                        type="button"
                        onClick={closePopup}
                        aria-label="Close order details"
                        className="text-2xl text-stone-400 hover:text-stone-800"
                     >
                        &times;
                     </button>
                  </div>

                  <div className="space-y-6 p-6">
                     {/* Customer Details */}
                     <section>
                        <h3 className="mb-3 font-semibold text-stone-800">
                           Customer Information
                        </h3>

                        <div className="grid gap-4 rounded-xl bg-stone-50 p-4 sm:grid-cols-2">
                           <div>
                              <p className="text-xs text-stone-500">Customer Name</p>
                              <p className="mt-1 text-sm font-semibold text-stone-800">
                                 {selectedOrder.customer}
                              </p>
                           </div>

                           <div>
                              <p className="text-xs text-stone-500">Phone Number</p>
                              <p className="mt-1 text-sm font-semibold text-stone-800">
                                 {selectedOrder.phone}
                              </p>
                           </div>

                           <div className="sm:col-span-2">
                              <p className="text-xs text-stone-500">Delivery Address</p>
                              <p className="mt-1 text-sm font-medium text-stone-800">
                                 {selectedOrder.address}
                              </p>
                           </div>
                        </div>
                     </section>

                     {/* Items */}
                     <section>
                        <h3 className="mb-3 font-semibold text-stone-800">
                           Ordered Items
                        </h3>

                        <div className="overflow-hidden rounded-xl border border-stone-200">
                           {selectedOrder.items.map((item, index) => (
                              <div
                                 key={`${item.name} -${index} `}
                                 className="flex items-center justify-between gap-4 border-b border-stone-100 p-4 last:border-b-0"
                              >
                                 <div>
                                    <p className="text-sm font-semibold text-stone-800">
                                       {item.name}
                                    </p>
                                    <p className="mt-1 text-xs text-stone-500">
                                       {item.quantity}
                                    </p>
                                 </div>

                                 <p className="whitespace-nowrap text-sm font-semibold text-stone-800">
                                    ₹{item.price}
                                 </p>
                              </div>
                           ))}
                        </div>
                     </section>

                     {/* Payment Details */}
                     <section className="rounded-xl bg-[#F5F7F0] p-4">
                        <div className="flex items-center justify-between gap-3">
                           <div>
                              <p className="text-sm text-stone-500">Payment Method</p>
                              <p className="mt-1 font-semibold text-stone-800">
                                 {selectedOrder.payment}
                              </p>
                           </div>

                           <div className="text-right">
                              <p className="text-sm text-stone-500">Order Total</p>
                              <p className="mt-1 text-xl font-bold text-[#315C3B]">
                                 ₹{selectedOrder.total.toLocaleString("en-IN")}
                              </p>
                           </div>
                        </div>
                     </section>

                     {/* Status Update UI */}
                     <section>
                        <h3 className="mb-3 font-semibold text-stone-800">
                           Update Order Status
                        </h3>

                        <label
                           htmlFor="order-status"
                           className="mb-2 block text-sm text-stone-600"
                        >
                           Order status
                        </label>

                        <select
                           id="order-status"
                           defaultValue={selectedOrder.status}
                           className={`${inputStyle} w - full`}
                        >
                           <option value="Placed">Placed</option>
                           <option value="Confirmed">Confirmed</option>
                           <option value="Preparing">Preparing</option>
                           <option value="Out for delivery">Out for delivery</option>
                           <option value="Delivered">Delivered</option>
                           <option value="Cancelled">Cancelled</option>
                        </select>
                     </section>
                  </div>

                  {/* Popup Footer */}
                  <div className="flex flex-wrap justify-end gap-3 border-t border-stone-100 p-6">
                     <button
                        type="button"
                        onClick={closePopup}
                        className="rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-50"
                     >
                        Close
                     </button>

                     <button
                        type="button"
                        onClick={closePopup}
                        className="rounded-full bg-[#315C3B] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#24472D]"
                     >
                        Update Status
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default Orders;