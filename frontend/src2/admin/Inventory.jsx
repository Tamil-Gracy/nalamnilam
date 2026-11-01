import { useState } from "react";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";

const inventoryItems = [
   {
      id: 1,
      name: "Country Tomatoes",
      category: "Vegetables",
      available: "4 kg",
      reorder: "20 kg",
      status: "Low stock",
   },
   {
      id: 2,
      name: "Baby Spinach",
      category: "Vegetables",
      available: "6 bunches",
      reorder: "30 bunches",
      status: "Low stock",
   },
   {
      id: 3,
      name: "Farm Carrots",
      category: "Vegetables",
      available: "12 kg",
      reorder: "25 kg",
      status: "In stock",
   },
   {
      id: 4,
      name: "Seasonal Mangoes",
      category: "Fruits",
      available: "4 kg",
      reorder: "20 kg",
      status: "Low stock",
   },
   {
      id: 5,
      name: "Red Apples",
      category: "Fruits",
      available: "22 kg",
      reorder: "40 kg",
      status: "In stock",
   },
   {
      id: 6,
      name: "Fresh Oranges",
      category: "Fruits",
      available: "9 kg",
      reorder: "25 kg",
      status: "In stock",
   },
];

const Inventory = () => {
   const [selectedItem, setSelectedItem] = useState(null);

   const openPopup = (item = null) => {
      setSelectedItem(item);
   };

   const closePopup = () => {
      setSelectedItem(null);
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
                     Inventory Management
                  </h1>
                  <p className="mt-1 text-sm text-stone-500">
                     Monitor stock levels and manage inventory adjustments.
                  </p>
               </div>

               {/* Summary cards */}
               <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-stone-200 bg-white p-5">
                     <p className="text-sm text-stone-500">Tracked items</p>
                     <p className="mt-2 text-3xl font-bold text-[#1F3827]">86</p>
                     <p className="mt-2 text-xs text-stone-500">
                        All categories
                     </p>
                  </div>

                  <div className="rounded-2xl border border-stone-200 bg-white p-5">
                     <p className="text-sm text-stone-500">Low stock</p>
                     <p className="mt-2 text-3xl font-bold text-[#1F3827]">6</p>
                     <p className="mt-2 text-xs text-stone-500">
                        Replenish soon
                     </p>
                  </div>

                  <div className="rounded-2xl border border-stone-200 bg-white p-5">
                     <p className="text-sm text-stone-500">Out of stock</p>
                     <p className="mt-2 text-3xl font-bold text-[#1F3827]">2</p>
                     <p className="mt-2 text-xs text-stone-500">
                        Temporarily unavailable
                     </p>
                  </div>
               </div>

               {/* Search and stock adjustment */}
               <div className="mt-6 flex flex-wrap gap-3">
                  <input
                     type="text"
                     placeholder="Search inventory"
                     className="min-w-[220px] flex-1 rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#315C3B] focus:ring-2 focus:ring-green-100"
                  />

                  <button
                     type="button"
                     onClick={() => openPopup()}
                     className="rounded-full bg-[#315C3B] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#24472D]"
                  >
                     + Stock adjustment
                  </button>
               </div>

               {/* Inventory table */}
               <div className="mt-5 overflow-x-auto rounded-2xl border border-stone-200 bg-white">
                  <table className="w-full min-w-[700px] text-left text-sm">
                     <thead className="bg-stone-50 text-xs uppercase tracking-wider text-stone-500">
                        <tr>
                           <th className="px-5 py-4">Product</th>
                           <th className="px-5 py-4">Category</th>
                           <th className="px-5 py-4">Available</th>
                           <th className="px-5 py-4">Reorder level</th>
                           <th className="px-5 py-4">Status</th>
                           <th className="px-5 py-4">Action</th>
                        </tr>
                     </thead>

                     <tbody>
                        {inventoryItems.map((item) => (
                           <tr
                              key={item.id}
                              className="border-t border-stone-100 transition hover:bg-stone-50/70"
                           >
                              <td className="px-5 py-4 font-semibold text-stone-800">
                                 {item.name}
                              </td>

                              <td className="px-5 py-4 text-stone-600">
                                 {item.category}
                              </td>

                              <td className="px-5 py-4 font-medium text-stone-700">
                                 {item.available}
                              </td>

                              <td className="px-5 py-4 text-stone-600">
                                 {item.reorder}
                              </td>

                              <td className="px-5 py-4">
                                 <span
                                    className={`rounded-full px-3 py-1 text-xs font-bold ${item.status === "Low stock"
                                          ? "bg-amber-100 text-amber-800"
                                          : "bg-green-100 text-green-800"
                                       }`}
                                 >
                                    {item.status}
                                 </span>
                              </td>

                              <td className="px-5 py-4">
                                 <button
                                    type="button"
                                    onClick={() => openPopup(item)}
                                    className="font-bold text-[#315C3B] transition hover:text-green-800 hover:underline cursor-pointer"
                                 >
                                    Adjust
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>

               <p className="mt-4 text-xs leading-5 text-stone-500">
                  Stock must be updated on the server. At checkout, reserve stock
                  atomically so two customers cannot buy the same final item.
               </p>
            </main>
         </div>

         {/* Stock adjustment popup */}
         {selectedItem !== null && (
            <div
               className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
               onClick={closePopup}
            >
               <div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="stock-popup-title"
                  className="w-full max-w-lg rounded-2xl bg-white shadow-2xl"
                  onClick={(event) => event.stopPropagation()}
               >
                  {/* Popup header */}
                  <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
                     <div>
                        <h2
                           id="stock-popup-title"
                           className="text-xl font-bold text-[#1F3827]"
                        >
                           Stock Adjustment
                        </h2>
                        <p className="mt-1 text-sm text-stone-500">
                           Add or remove product stock.
                        </p>
                     </div>

                     <button
                        type="button"
                        onClick={closePopup}
                        aria-label="Close popup"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-xl text-stone-600 transition hover:bg-stone-200"
                     >
                        &times;
                     </button>
                  </div>

                  {/* Popup form */}
                  <div className="space-y-5 p-6">
                     <div className="rounded-xl bg-stone-50 p-4">
                        <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
                           Selected product
                        </p>
                        <p className="mt-1 font-bold text-[#1F3827]">
                           {selectedItem?.name || "Select a product"}
                        </p>

                        {selectedItem && (
                           <div className="mt-3 flex flex-wrap gap-4 text-sm text-stone-600">
                              <p>
                                 Category:{" "}
                                 <span className="font-medium text-stone-800">
                                    {selectedItem.category}
                                 </span>
                              </p>
                              <p>
                                 Available:{" "}
                                 <span className="font-bold text-[#315C3B]">
                                    {selectedItem.available}
                                 </span>
                              </p>
                           </div>
                        )}
                     </div>

                     <div>
                        <label className="mb-2 block text-sm font-semibold text-stone-700">
                           Product
                        </label>
                        <select
                           defaultValue={selectedItem?.id || ""}
                           className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#315C3B] focus:ring-2 focus:ring-green-100"
                        >
                           <option value="" disabled>
                              Select product
                           </option>
                           {inventoryItems.map((item) => (
                              <option key={item.id} value={item.id}>
                                 {item.name}
                              </option>
                           ))}
                        </select>
                     </div>

                     <div>
                        <label className="mb-2 block text-sm font-semibold text-stone-700">
                           Adjustment type
                        </label>
                        <select
                           defaultValue="add"
                           className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#315C3B] focus:ring-2 focus:ring-green-100"
                        >
                           <option value="add">Add stock</option>
                           <option value="remove">Remove stock</option>
                           <option value="correction">Stock correction</option>
                        </select>
                     </div>

                     <div>
                        <label className="mb-2 block text-sm font-semibold text-stone-700">
                           Quantity
                        </label>
                        <input
                           type="number"
                           min="1"
                           placeholder="Enter quantity"
                           className="w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-[#315C3B] focus:ring-2 focus:ring-green-100"
                        />
                     </div>

                     <div>
                        <label className="mb-2 block text-sm font-semibold text-stone-700">
                           Reason / Notes
                        </label>
                        <textarea
                           rows="3"
                           placeholder="e.g. New stock received from supplier"
                           className="w-full resize-none rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-[#315C3B] focus:ring-2 focus:ring-green-100"
                        />
                     </div>
                  </div>

                  {/* Popup footer */}
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
                        Save Adjustment
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default Inventory;