import { useState, useEffect } from "react";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import axios from "axios";


const API = import.meta.env.VITE_API_URL;

const Inventory = () => {

   const [loading, setLoading] = useState(true);

   const [inventoryItems, setInventoryItems] = useState([]);

   //for search 
   const [searchTerm, setSearchTerm] = useState("");

   // form
   const [formData, setFormData] = useState({
      productId:"",
      adjustType: "ADDED",
      quantity: "",
      reason: ""
   })
   //for messages
   const [message, setMessage] = useState("");
   const [messageType, setMessageType] = useState("success");
   // Show success or error popup
   const showMessage = (type, text) => {
      setMessageType(type);
      setMessage(text);
   };


   const fetchProducts = async () => {
      try {
         const responseinventory = await axios.get(`${API}/api/inventory`);
         setInventoryItems(responseinventory.data.data)
      } catch (error) {
         console.error("Failed to fetch data:", error);
      } finally {
         setLoading(false);
      }
      
   };

   useEffect(() => {
      fetchProducts();
   }, []);

   const [selectedItem, setSelectedItem] = useState(null);

   const openPopup = (item = null) => {
      setSelectedItem(item);
     
   };

   const closePopup = () => {
      setSelectedItem(null);
      setMessage("");
   };

   if (loading) {
      return <p className="p-8">Loading ...</p>;
   }

   const filteredItems = inventoryItems.filter((item) =>
      item.productId?.name
         ?.toLowerCase()
         .includes(searchTerm.toLowerCase())
   );

   const lowstock = inventoryItems.filter(
      (item) => item.stock > 0 && item.stock <= item.reorderLevel
   );

   const outOfStock = inventoryItems.filter(
      (item) => item.stock === 0
   );
   const handleSave = async (e) => {
      e.preventDefault();
      if (!formData.adjustType || !formData.quantity) {
         alert('Please enter required fields..')
      }
      const res = await axios.post(`${API}/api/inventory/adjust`, {
         productId: selectedItem.productId._id,
         adjustType: formData.adjustType,
         quantity: formData.quantity,
         reason: formData.reason,
      })
         .then((res) => {
            showMessage(
               "success",
               res.data.message 
            );
            setFormData("");
           
            //console.log(res);
         }).catch((err) => {
            showMessage(
               "error",
               err.response?.data?.message
            );
            console.log(err);
         })
      fetchProducts();
     
   }

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
                     <p className="mt-2 text-3xl font-bold text-[#1F3827]">{inventoryItems.length}</p>
                     <p className="mt-2 text-xs text-stone-500">
                        All categories
                     </p>
                  </div>

                  <div className="rounded-2xl border border-stone-200 bg-white p-5">
                     <p className="text-sm text-stone-500">Low stock</p>
                     <p className="mt-2 text-3xl font-bold text-[#1F3827]">{lowstock.length}</p>
                     <p className="mt-2 text-xs text-stone-500">
                        Replenish soon
                     </p>
                  </div>

                  <div className="rounded-2xl border border-stone-200 bg-white p-5">
                     <p className="text-sm text-stone-500">Out of stock</p>
                     <p className="mt-2 text-3xl font-bold text-[#1F3827]">{outOfStock.length}</p>
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
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  {/* <button
                     type="button"
                     onClick={() => openPopup()}
                     className="rounded-full bg-[#315C3B] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#24472D]"
                  >
                     + Stock adjustment
                  </button> */}
               </div>

               {/* Inventory table */}
               <div className="mt-5 overflow-x-auto rounded-2xl border border-stone-200 bg-white">
                  <table className="w-full min-w-[700px] text-left text-sm">
                     <thead className="bg-stone-50 text-xs uppercase tracking-wider text-stone-500">
                        <tr>
                           <th className="px-5 py-4">Product</th>
                           <th className="px-5 py-4">Name</th>
                           <th className="px-5 py-4">Category</th>
                           <th className="px-5 py-4">Available</th>
                           <th className="px-5 py-4">Reorder level</th>
                           <th className="px-5 py-4">Action</th>
                        </tr>
                     </thead>

                     <tbody>
                        {filteredItems.map((item) => (
                           <tr key={item._id}
                              className="border-t border-stone-100 transition hover:bg-stone-50/70 "
                           >
                              <td className="px-5 py-4 font-semibold text-stone-800">
                                 <img src={`${API}${item.productId?.image}`} alt={item.name} loading="lazy" className="h-10 mx-auto" />
                              </td>
                              <td className="px-5 py-4 font-semibold text-stone-800">
                                 {item.productId?.name}
                              </td>

                              <td className="px-5 py-4 text-stone-600">
                                 {item.productId?.category?.name || "Uncategorized"}
                              </td>

                              <td className="px-5 py-4 font-medium text-stone-700">
                                 {item.stock}
                              </td>

                              <td className="px-5 py-4 text-stone-600">
                                 {item.reorderLevel}
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
                  <div className="flex items-center justify-between border-b border-stone-200 px-6 py-3">
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
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-xl text-stone-600 transition hover:bg-stone-200 cursor-pointer"
                     >
                        &times;
                     </button>
                  </div>

                  {/* Popup form */}
                  <form className="popupform" onSubmit={handleSave}>
                     <div className="space-y-5 p-6">

                        <div className="rounded-xl bg-stone-50 p-1">
                           <p className="mt-1 font-bold text-[#1F3827]">
                              {selectedItem?.productId?.name || "Select a product"}
                           </p>
                           <p>
                              Available stock:
                              <span className="font-bold text-[#315C3B]">
                                 {selectedItem.stock}
                              </span>
                           </p>

                        </div>

                        <div>
                           <label className="mb-2 block text-sm font-semibold text-stone-700">
                              Adjustment type
                           </label>
                           <select
                              name="adjustType"
                              required
                              className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#315C3B] focus:ring-2 focus:ring-green-100"
                              value={formData.adjustType}
                              onChange={(e) => setFormData((prev) => ({
                                 ...prev,
                                 adjustType: e.target.value

                              }))} >
                              <option value="ADDED">Add stock</option>
                              <option value="REMOVED">Remove stock</option>
                              <option value="CORRECTED">Stock correction</option>
                           </select>
                        </div>

                        <div>
                           <label className="mb-2 block text-sm font-semibold text-stone-700">
                              Quantity
                           </label>
                           <input
                              type="number"
                              min="1"
                              name="quantity"
                              required
                              placeholder="Enter quantity"
                              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-[#315C3B] focus:ring-2 focus:ring-green-100"
                              value={formData.quantity}
                              onChange={(e) => setFormData((prev) => ({
                                 ...prev,
                                 quantity: e.target.value

                              }))} />
                        </div>

                        <div>
                           <label className="mb-2 block text-sm font-semibold text-stone-700">
                              Reason / Notes
                           </label>
                           <textarea
                              rows="3"
                              name="reason"
                              placeholder="e.g. New stock received from supplier"
                              className="w-full resize-none rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-[#315C3B] focus:ring-2 focus:ring-green-100"
                              value={formData.reason}
                              onChange={(e) => setFormData((prev) => ({
                                 ...prev,
                                 reason: e.target.value

                              }))} />
                        </div>

                     </div>

                     {/* Popup footer */}
                     <div className="flex justify-end gap-3 border-t border-stone-200 px-6 py-4">
                        <button
                           type="button"
                           onClick={closePopup}
                           className="rounded-full border border-stone-300 px-5 py-2.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-100 cursor-pointer"
                        >
                           Cancel
                        </button>

                        <button
                           type="submit"
                           className="rounded-full bg-[#315C3B] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#24472D] cursor-pointer"
                        >
                           Save Adjustment
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         )}
         {message &&  (
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
      </div >

   );
};

export default Inventory;