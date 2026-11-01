import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const AddProduct = () => {
   const navigate = useNavigate();
   const [categories, setCategories] = useState([]);
   useEffect(() => {
      const fetchData = async () => {
         try {
            const categoryResponse = await axios.get(
               `${API}/api/categories`
            );
            setCategories(categoryResponse.data.data || []);

         } catch (error) {
            console.error("Failed to fetch data:", error);
         }
      };

      fetchData();
   }, []);

   const [addFormData, setAddFormData] = useState({
      name: "",
      description: "",
      category: "",
      price: "",
      discountPrice: "",
      stock: "",
      quantity: "",
      unit: "",
      image: null,
      badge:"",
      status:"true"
   })
   const [message, setMessage] = useState("");
   const [messageType, setMessageType] = useState("success");
   const [popup, setPopup] = useState("");

   // Close popup
   const closePopup = () => {
      setPopup("");
      navigate("/admin/products")
   };

   // Show success or error popup
   const showMessage = (type, text) => {
      setMessageType(type);  
      setMessage(text);
      setPopup("message");
   };




   const handleAdd = async (e) => {
      e.preventDefault();

      if (!addFormData.image) {
         showMessage("error", "Please select a product image.");
         return;
      }

      try {
         const formData = new FormData();

         formData.append("name", addFormData.name);
         formData.append("description", addFormData.description);
         formData.append("category", addFormData.category);
         formData.append("price", addFormData.price);
         formData.append("discountPrice", addFormData.discountPrice);
         formData.append("stock", addFormData.stock);
         formData.append("quantity", addFormData.quantity);
         formData.append("unit", addFormData.unit);
         formData.append("status", addFormData.status);
         formData.append("badge", addFormData.badge);
         formData.append("image", addFormData.image);

         const res = await axios.post(
            `${API}/api/products`,
            formData
         );

         showMessage(
            "success",
            res.data.message || "Product added successfully!"
         );

      } catch (err) {
         console.error("Error adding product:", err.response?.data);

         showMessage(
            "error",
            err.response?.data?.message || "Failed to add product."
         );
      }
   };




   return (
      <>
         <div className="min-h-screen lg:grid lg:grid-cols-[250px_1fr]">
            <SideBar />
            <div>
               <TopBar />
               <main className="p-5 sm:p-8">
                  <div className="max-w-4xl">
                     <p className="text-sm text-stone-500">Add the product information customers will see on the storefront.</p>
                     <form className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8" onSubmit={handleAdd}>
                        <div className="grid gap-5 sm:grid-cols-2">
                           <label className="text-sm font-semibold">
                              Product name
                              <input
                                 placeholder="e.g. Country Tomatoes"
                                 className="mt-2 block w-full rounded-xl border border-stone-300 px-4 py-3 font-normal"
                                 type="text"
                                 name="name"
                                 required
                                 value={addFormData.name}
                                 onChange={(e) => {
                                    setAddFormData((prev) => (
                                       {
                                          ...prev,
                                          name:e.target.value
                                       }
                                    ))
                                 }}
                              />
                           </label>
                           <label className="text-sm font-semibold">
                              Category
                              <select
                                 className="mt-2 block w-full rounded-xl border border-stone-300 bg-white px-4 py-3 font-normal"
                                 name="category"
                                 value={addFormData.category}
                                 required
                                 onChange={(e) => {
                                    setAddFormData((prev) => (
                                       {
                                          ...prev,
                                          category: e.target.value
                                       }
                                    ))
                                 }}
                              >
                                 <option>Select category</option>
                                 {categories.map((category) => {
                                    return (
                                       <option value={category._id} key={category._id}>{category.name}</option>
                                    )
                                 })}

                              </select>
                           </label>
                           <label className="text-sm font-semibold">
                              Price (₹)
                              <input
                                 type="number"
                                 placeholder="38"
                                 className="mt-2 block w-full rounded-xl border border-stone-300 px-4 py-3 font-normal"
                                 name="price"
                                 value={addFormData.price}
                                 required
                                 onChange={(e) => {
                                    setAddFormData((prev) => (
                                       {
                                          ...prev,
                                          price: e.target.value
                                       }
                                    ))
                                 }}
                              />

                           </label>
                           <label className="text-sm font-semibold">
                              Discount(₹)
                              <input
                                 type="number"
                                 placeholder="38"
                                 className="mt-2 block w-full rounded-xl border border-stone-300 px-4 py-3 font-normal"
                                 name="discountPrice"
                                 value={addFormData.discountPrice}
                                 required
                                 onChange={(e) => {
                                    setAddFormData((prev) => (
                                       {
                                          ...prev,
                                          discountPrice: e.target.value
                                       }
                                    ))
                                 }}
                              />

                           </label>
                           <div>
                              <label className="mb-1 block text-sm font-medium">
                                 Quantity
                              </label>

                              <input
                                 type="number"
                                 name="quantity"
                                 min="1"
                                 step="any"
                                 required
                                 placeholder="e.g. 1 ,500"
                                 className="w-full rounded-lg border border-stone-300 px-3 py-2"
                                 value={addFormData.quantity}
                                 onChange={(e) => {
                                    setAddFormData((prev) => (
                                       {
                                          ...prev,
                                          quantity: e.target.value
                                       }
                                    ))
                                 }}
                              />
                           </div>

                           <div>
                              <label className="mb-1 block text-sm font-medium">
                                 Unit
                              </label>

                              <select
                                 name="unit"
                                 required
                                 className="w-full rounded-lg border border-stone-300 px-3 py-2"
                                 value={addFormData.unit}
                                 onChange={(e) => {
                                    setAddFormData((prev) => (
                                       {
                                          ...prev,
                                          unit: e.target.value
                                       }
                                    ))
                                 }}
                              >
                                 <option value="">Select unit</option>
                                 <option value="g">Gram (g)</option>
                                 <option value="kg">Kilogram (kg)</option>
                                 <option value="ml">Millilitre (ml)</option>
                                 <option value="litre">Litre (L)</option>
                                 <option value="pack">Pack</option>
                                 <option value="piece">Piece</option>
                              </select>
                           </div>
                           {/* <label className="text-sm font-semibold">
                              Available stock
                              <input
                                 type="number"
                                 placeholder="20"
                                 className="mt-2 block w-full rounded-xl border border-stone-300 px-4 py-3 font-normal"
                                 name="stock"
                                 value={addFormData.stock}
                                 required
                                 onChange={(e) => {
                                    setAddFormData((prev) => (
                                       {
                                          ...prev,
                                          stock: e.target.value
                                       }
                                    ))
                                 }}
                              />
                           </label> */}
                           <div>
                              <label className="mb-1 block text-sm font-medium">
                                 Badge/Tag
                              </label>

                              <select
                                 name="badge"
                                 className="w-full rounded-lg border border-stone-300 px-3 py-2"
                                 value={addFormData.badge}
                                 onChange={(e) => {
                                    setAddFormData((prev) => (
                                       {
                                          ...prev,
                                          badge: e.target.value
                                       }
                                    ))
                                 }}
                              >
                                 <option value="">Select badge</option>
                                 <option value="New">New</option>
                                 <option value="Chemical-Free">Chemical-Free</option>
                                 <option value="Certified Organic">Certified Organic</option>
                                 <option value="Natural">Natural</option>
                                 <option value="Unpolished">Unpolished</option>
                              </select>
                           </div>
                           <label className="text-sm font-semibold">
                              Product status
                              <select
                                 className="mt-2 block w-full rounded-xl border border-stone-300 bg-white px-4 py-3 font-normal"
                                 name="stock"
                                 required
                                 value={addFormData.status}
                                 onChange={(e) => {
                                    setAddFormData((prev) => (
                                       {
                                          ...prev,
                                          status: e.target.value
                                       }
                                    ))
                                 }}
                              >
                                 <option value="true">Active</option>
                                 <option value="false">Inactive</option>
                              </select>
                           </label>
                           <label className="text-sm font-semibold sm:col-span-2">
                              Image URL
                              <input
                                 placeholder="Paste a hosted image URL"
                                 className="mt-2 block w-full rounded-xl border border-stone-300 px-4 py-3 font-normal"
                                 type="file"
                                 name="image"
                                 required
                                 accept="image/*"
                                 onChange={(e) =>
                                    setAddFormData((prev) => ({
                                       ...prev,
                                       image: e.target.files[0] || null,
                                    }))
                                 }
                              
                              />
                           </label>
                           <label className="text-sm font-semibold sm:col-span-2">
                              Description
                              <textarea
                                 rows="4"
                                 placeholder="Describe sourcing, freshness and storage guidance" className="mt-2 block w-full rounded-xl border border-stone-300 px-4 py-3 font-normal"
                                 value={addFormData.description}
                                 required
                                 onChange={(e) =>
                                    setAddFormData((prev) => ({
                                       ...prev,
                                       description: e.target.value,
                                    }))
                                 }
                              ></textarea>
                           </label>
                        </div>
                        <div className="mt-7 flex flex-wrap gap-3">
                           <button
                              type="submit" className="rounded-full bg-[#315C3B] px-6 py-3 text-sm font-bold text-white cursor-pointer">Save product</button>
                           <Link to="/admin/products" className="rounded-full border border-stone-300 px-6 py-3 text-sm font-bold">Cancel</Link>
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
               </main>
            </div>
         </div>
      </>
   );
}

export default AddProduct;
