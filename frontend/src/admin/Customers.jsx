import { useState, useEffect } from "react";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const Customers = () => {
   const [selectedCustomer, setSelectedCustomer] = useState(null);
   const [popupType, setPopupType] = useState("");

   const openEditPopup = (customer) => {
      setSelectedCustomer(customer);
      setPopupType("edit");
   };

   const openDeletePopup = (customer) => {
      setSelectedCustomer(customer);
      setPopupType("delete");
   };

   const closePopup = () => {
      setSelectedCustomer(null);
      setPopupType("");
   };

   const [customers, setCustomers] = useState([]);

   const fetchCustomers = async () => {
      try {
         const res = await axios.get(`${API}/api/users`);
         console.log("Fetched customers:", res.data.data);
         setCustomers(res.data.data);
      } catch (err) {
         console.log("Error fetching customers:", err.response?.data);
      }
   };
 

   return (
      <div className="min-h-screen lg:grid lg:grid-cols-[250px_1fr]">
         <SideBar />

         <div className="min-w-0">
            <TopBar />

            <main className="p-5 sm:p-8">
               {/* Page heading */}
               <div className="mb-6">
                  <h1 className="text-2xl font-bold text-[#1F3827]">
                     Customers
                  </h1>
                  <p className="mt-1 text-sm text-stone-500">
                     Manage customer details and view their shopping activity.
                  </p>
               </div>

               {/* Summary cards */}
               <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-stone-200 bg-white p-5">
                     <p className="text-sm text-stone-500">Total customers</p>
                     <p className="mt-2 text-3xl font-bold text-[#1F3827]">
                        {customers.length}
                     </p>
                     <p className="mt-2 text-xs text-stone-500">
                        Registered accounts
                     </p>
                  </div>

                  {/* <div className="rounded-2xl border border-stone-200 bg-white p-5">
                     <p className="text-sm text-stone-500">New this month</p>
                     <p className="mt-2 text-3xl font-bold text-[#1F3827]">
                        86
                     </p>
                     <p className="mt-2 text-xs text-stone-500">
                        Demo figures
                     </p>
                  </div> */}

                  {/* <div className="rounded-2xl border border-stone-200 bg-white p-5">
                     <p className="text-sm text-stone-500">Repeat customers</p>
                     <p className="mt-2 text-3xl font-bold text-[#1F3827]">
                        64%
                     </p>
                     <p className="mt-2 text-xs text-stone-500">
                        Customer retention
                     </p>
                  </div> */}
               </div>

               {/* Search */}
               <div className="mt-6 flex gap-3">
                  <input
                     type="text"
                     placeholder="Search name, email or phone"
                     className="min-w-[220px] flex-1 rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#315C3B] focus:ring-2 focus:ring-green-100"
                  />
               </div>

               {/* Customers table */}
               <div className="mt-5 overflow-x-auto rounded-2xl border border-stone-200 bg-white">
                  <table className="w-full min-w-[850px] text-left text-sm">
                     <thead className="bg-stone-50 text-xs uppercase tracking-wider text-stone-500">
                        <tr>
                           <th className="px-5 py-4">Customer</th>
                           <th className="px-5 py-4">Email</th>
                           <th className="px-5 py-4">Phone</th>
                           <th className="px-5 py-4">Orders</th>
                           {/* <th className="px-5 py-4">Actions</th> */}
                        </tr>
                     </thead>

                     <tbody>
                        {customers.map((customer) => {
                           const res = axios.get(`${API}/api/orders/${customer._id}`);
                           const orders = res.data.data;
                           (<tr
                              key={customer._id}
                              className="border-t border-stone-100 transition hover:bg-stone-50/70"
                           >
                              <td className="px-5 py-4 font-semibold text-stone-800">
                                 {customer.name}
                              </td>

                              <td className="px-5 py-4 text-stone-600">
                                 {customer.email}
                              </td>

                              <td className="px-5 py-4 text-stone-600">
                                 {customer.mobile}
                              </td>

                              <td className="px-5 py-4 text-stone-700">
                                 {orders.length}
                              </td>
                              {/* <td className="px-5 py-4">
                                 <div className="flex items-center gap-3">
                                    <button
                                       type="button"
                                       onClick={() => openEditPopup(customer)}
                                       className="font-semibold text-[#315C3B] hover:underline cursor-pointer"
                                    >
                                       Edit
                                    </button>

                                    <button
                                       type="button"
                                       onClick={() => openDeletePopup(customer)}
                                       className="font-semibold text-red-600 hover:underline cursor-pointer"
                                    >
                                       Delete
                                    </button>
                                 </div>
                              </td> */}
                           </tr>
                        )})}
                     </tbody>
                  </table>
               </div>
            </main>
         </div>

         {/* Edit Customer Popup */}
         {popupType === "edit" && selectedCustomer && (
            <div
               className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
               onClick={closePopup}
            >
               <div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="edit-customer-title"
                  className="w-full max-w-lg rounded-2xl bg-white shadow-2xl"
                  onClick={(event) => event.stopPropagation()}
               >
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
                     <div>
                        <h2
                           id="edit-customer-title"
                           className="text-xl font-bold text-[#1F3827]"
                        >
                           Edit Customer
                        </h2>
                        <p className="mt-1 text-sm text-stone-500">
                           View or edit customer information.
                        </p>
                     </div>

                     <button
                        type="button"
                        onClick={closePopup}
                        aria-label="Close popup"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-xl text-stone-600 hover:bg-stone-200"
                     >
                        &times;
                     </button>
                  </div>

                  {/* Form */}
                  <div className="space-y-5 p-6">
                     <div>
                        <label className="mb-2 block text-sm font-semibold text-stone-700">
                           Full Name
                        </label>
                        <input
                           type="text"
                           defaultValue={selectedCustomer.name}
                           className="w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-[#315C3B] focus:ring-2 focus:ring-green-100"
                        />
                     </div>

                     <div>
                        <label className="mb-2 block text-sm font-semibold text-stone-700">
                           Email Address
                        </label>
                        <input
                           type="email"
                           defaultValue={selectedCustomer.email}
                           className="w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-[#315C3B] focus:ring-2 focus:ring-green-100"
                        />
                     </div>

                     <div>
                        <label className="mb-2 block text-sm font-semibold text-stone-700">
                           Phone Number
                        </label>
                        <input
                           type="tel"
                           defaultValue={selectedCustomer.phone}
                           className="w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-[#315C3B] focus:ring-2 focus:ring-green-100"
                        />
                     </div>

                     <div>
                        <label className="mb-2 block text-sm font-semibold text-stone-700">
                           Account Status
                        </label>
                        <select
                           defaultValue={selectedCustomer.status}
                           className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#315C3B] focus:ring-2 focus:ring-green-100"
                        >
                           <option value="Active">Active</option>
                           <option value="Inactive">Inactive</option>
                        </select>
                     </div>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-end gap-3 border-t border-stone-200 px-6 py-4">
                     <button
                        type="button"
                        onClick={closePopup}
                        className="rounded-full border border-stone-300 px-5 py-2.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-100"
                     >
                        Cancel
                     </button>

                     <button
                        type="button"
                        onClick={closePopup}
                        className="rounded-full bg-[#315C3B] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#24472D]"
                     >
                        Save Changes
                     </button>
                  </div>
               </div>
            </div>
         )}

         {/* Delete Customer Popup */}
         {popupType === "delete" && selectedCustomer && (
            <div
               className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
               onClick={closePopup}
            >
               <div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="delete-customer-title"
                  className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
                  onClick={(event) => event.stopPropagation()}
               >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="27"
                        height="27"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                     >
                        <path d="M3 6h18" />
                        <path d="M8 6V4h8v2" />
                        <path d="m19 6-1 14H6L5 6" />
                        <path d="M10 11v5" />
                        <path d="M14 11v5" />
                     </svg>
                  </div>

                  <div className="mt-4 text-center">
                     <h2
                        id="delete-customer-title"
                        className="text-xl font-bold text-[#1F3827]"
                     >
                        Delete Customer?
                     </h2>

                     <p className="mt-2 text-sm leading-6 text-stone-500">
                        Are you sure you want to delete{" "}
                        <span className="font-bold text-stone-800">
                           {selectedCustomer.name}
                        </span>
                        ? This action cannot be undone once deletion is implemented.
                     </p>

                     <div className="mt-3 rounded-xl bg-stone-50 p-3 text-left text-sm">
                        <p className="font-semibold text-stone-800">
                           {selectedCustomer.name}
                        </p>
                        <p className="mt-1 text-stone-500">
                           {selectedCustomer.email}
                        </p>
                        <p className="mt-1 text-stone-500">
                           {selectedCustomer.phone}
                        </p>
                     </div>
                  </div>

                  <div className="mt-6 flex justify-center gap-3">
                     <button
                        type="button"
                        onClick={closePopup}
                        className="rounded-full border border-stone-300 px-5 py-2.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-100"
                     >
                        Cancel
                     </button>

                     <button
                        type="button"
                        onClick={closePopup}
                        className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
                     >
                        Delete Customer
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default Customers;