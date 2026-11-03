
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const EditProduct = () => {
   const navigate = useNavigate();
   const location = useLocation();

   const product = location.state?.product;

   const [categories, setCategories] = useState([]);

   const [editFormData, setEditFormData] = useState({
      name: product?.name || "",
      description: product?.description || "",
      category:
         typeof product?.category === "object"
            ? product?.category?._id || ""
            : product?.category || "",
      price: product?.price ?? "",
      discountPrice: product?.discountPrice ?? "",
      quantity: product?.quantity ?? "",
      unit: product?.unit || "",
      image: null,
      badge: product?.badge || "",
      status: product?.status ? "true" : "false",
   });

   const [message, setMessage] = useState("");
   const [messageType, setMessageType] = useState("success");
   const [popup, setPopup] = useState("");
   const [loading, setLoading] = useState(false);

   const [imagePreview, setImagePreview] = useState(`${API}${product.image}`);

   // Fetch categories
   useEffect(() => {
      const fetchData = async () => {
         try {
            const categoryResponse = await axios.get(
               `${API}/api/categories`
            );

            setCategories(
               categoryResponse.data.data || []
            );
         } catch (error) {
            console.error("Failed to fetch categories:", error);
         }
      };

      fetchData();
   }, []);

   // Handle input changes
   const handleChange = (e) => {
      const { name, value, files } = e.target;

      if (name === "image") {
         const file = files[0];

         if (file) {
            setEditFormData((prev) => ({
               ...prev,
               image: file,
            }));

            setImagePreview(URL.createObjectURL(file));
         }
      } else {
         setEditFormData((prev) => ({
            ...prev,
            [name]: value,
         }));
      }
   };

   // Popup functions
   const closePopup = () => {
      setPopup("");
      if (messageType === "success") {
         navigate("/admin/products");
      }
   };

   const showMessage = (type, text) => {
      setMessageType(type);
      setMessage(text);
      setPopup("message");
   };

   // Update product
   const handleUpdate = async (e) => {
      e.preventDefault();

      if (!product?._id) {
         showMessage("error", "Product data not found.");
         return;
      }

      try {
         setLoading(true);

         const formData = new FormData();

         formData.append("name", editFormData.name);
         formData.append("description", editFormData.description);
         formData.append("category", editFormData.category);
         formData.append("price", editFormData.price);
         formData.append("discountPrice", editFormData.discountPrice);
         formData.append("quantity", editFormData.quantity);
         formData.append("unit", editFormData.unit);
         formData.append("badge", editFormData.badge);
         formData.append("status", editFormData.status);

         // Send image only if a new one is selected
         if (editFormData.image) {
            formData.append("image", editFormData.image);
         }

         const response = await axios.put(
            `${API}/api/products/${product._id}`,
            formData
         );

         showMessage(
            "success",
            response.data.message || "Product updated successfully!"
         );
      } catch (error) {
         console.error(
            "Error updating product:",
            error.response?.data
         );

         showMessage(
            "error",
            error.response?.data?.message ||
            "Failed to update product."
         );
      } finally {
         setLoading(false);
      }
   };

   // Handle direct page access without product data
   if (!product) {
      return (
         <div className="min-h-screen lg:grid lg:grid-cols-[250px_1fr]">
            <SideBar />
            <div>
               <TopBar />
               <main className="p-6">
                  <p className="text-stone-600">
                     Product data not found. Please select a product
                     from the Products page.
                  </p>
                  <Link
                     to="/admin/products"
                     className="mt-4 inline-block rounded-full bg-[#315C3B] px-5 py-3 text-white"
                  >
                     Back to Products
                  </Link>
               </main>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen lg:grid lg:grid-cols-[250px_1fr]">
         <SideBar />

         <div>
            <TopBar />

            <main className="p-5 sm:p-8">
               <div className="max-w-4xl">
                  <Link
                     to="/admin/products"
                     className="text-sm text-[#315C3B] hover:underline"
                  >
                     ← Back to Products
                  </Link>

                  <h1 className="mt-3 text-2xl font-bold text-[#315C3B]">
                     Edit Product
                  </h1>

                  <p className="mt-1 text-sm text-stone-500">
                     Update your organic store product information.
                  </p>

                  <form
                     className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8"
                     onSubmit={handleUpdate}
                  >
                     <div className="grid gap-5 sm:grid-cols-2">
                        <label className="text-sm font-semibold">
                           Product name
                           <input
                              type="text"
                              name="name"
                              required
                              value={editFormData.name}
                              onChange={handleChange}
                              className="mt-2 block w-full rounded-xl border border-stone-300 px-4 py-3 font-normal"
                           />
                        </label>

                        <label className="text-sm font-semibold">
                           Category
                           <select
                              name="category"
                              required
                              value={editFormData.category}
                              onChange={handleChange}
                              className="mt-2 block w-full rounded-xl border border-stone-300 bg-white px-4 py-3 font-normal"
                           >
                              <option value="">Select category</option>
                              {categories.map((category) => (
                                 <option
                                    value={category._id}
                                    key={category._id}
                                 >
                                    {category.name}
                                 </option>
                              ))}
                           </select>
                        </label>

                        <label className="text-sm font-semibold">
                           Price (₹)
                           <input
                              type="number"
                              name="price"
                              min="0"
                              step="any"
                              required
                              value={editFormData.price}
                              onChange={handleChange}
                              className="mt-2 block w-full rounded-xl border border-stone-300 px-4 py-3 font-normal"
                           />
                        </label>

                        <label className="text-sm font-semibold">
                           Discount(₹)
                           <input
                              type="number"
                              name="discountPrice"
                              min="0"
                              step="any"
                              value={editFormData.discountPrice}
                              onChange={handleChange}
                              className="mt-2 block w-full rounded-xl border border-stone-300 px-4 py-3 font-normal"
                           />
                        </label>

                        <label className="text-sm font-semibold">
                           Quantity
                           <input
                              type="number"
                              name="quantity"
                              min="1"
                              step="any"
                              value={editFormData.quantity}
                              onChange={handleChange}
                              className="mt-2 block w-full rounded-xl border border-stone-300 px-4 py-3 font-normal"
                           />
                        </label>

                        <label className="text-sm font-semibold">
                           Unit
                           <select
                              name="unit"
                              required
                              value={editFormData.unit}
                              onChange={handleChange}
                              className="mt-2 block w-full rounded-xl border border-stone-300 bg-white px-4 py-3 font-normal"
                           >
                              <option value="">Select unit</option>
                              <option value="g">Gram (g)</option>
                              <option value="kg">Kilogram (kg)</option>
                              <option value="ml">Millilitre (ml)</option>
                              <option value="litre">Litre (L)</option>
                              <option value="pack">Pack</option>
                              <option value="piece">Piece</option>
                           </select>
                        </label>

                        {/* <label className="text-sm font-semibold">
                           Available stock
                           <input
                              type="number"
                              name="stock"
                              min="0"
                              required
                              value={editFormData.stock}
                              onChange={handleChange}
                              className="mt-2 block w-full rounded-xl border border-stone-300 px-4 py-3 font-normal"
                           />
                        </label> */}
                        <label className="text-sm font-semibold">
                          Badge
                           <select
                              name="badge"
                              value={editFormData.badge}
                              onChange={handleChange}
                              className="mt-2 block w-full rounded-xl border border-stone-300 bg-white px-4 py-3 font-normal"
                           >
                              <option value="">Select badge</option>
                              <option value="New">New</option>
                              <option value="Chemical-Free">Chemical-Free</option>
                              <option value="Certified Organic">Certified Organic</option>
                              <option value="Natural">Natural</option>
                              <option value="Unpolished">Unpolished</option>
                           </select>
                        </label>      
                        <label className="text-sm font-semibold">
                           Product status
                           <select
                              name="status"
                              value={editFormData.status}
                              onChange={handleChange}
                              className="mt-2 block w-full rounded-xl border border-stone-300 bg-white px-4 py-3 font-normal"
                           >
                              <option value="true">Active</option>
                              <option value="false">Inactive</option>
                           </select>
                        </label>

                        <div className="sm:col-span-2">
                           <label className="text-sm font-semibold">
                              Product image
                           </label>

                           {imagePreview && (
                              <img
                                 src={imagePreview}
                                 alt={editFormData.name}
                                 className="mt-3 h-28 w-28 rounded-xl border border-stone-200 object-cover"
                              />
                           )}

                           <input
                              type="file"
                              name="image"
                              accept="image/*"
                              onChange={handleChange}
                              className="mt-3 block w-full rounded-xl border border-stone-300 px-4 py-3 font-normal"
                           />

                           <p className="mt-1 text-xs text-stone-500">
                              Choose a new image only if you want to replace
                              the existing one.
                           </p>
                        </div>

                        <label className="text-sm font-semibold sm:col-span-2">
                           Description
                           <textarea
                              name="description"
                              rows="4"
                              value={editFormData.description}
                              onChange={handleChange}
                              className="mt-2 block w-full rounded-xl border border-stone-300 px-4 py-3 font-normal"
                           />
                        </label>
                     </div>

                     <div className="mt-7 flex flex-wrap gap-3">
                        <button
                           type="submit"
                           disabled={loading}
                           className="cursor-pointer rounded-full bg-[#315C3B] px-6 py-3 text-sm font-bold text-white disabled:opacity-60"
                        >
                           {loading ? "Updating..." : "Update Product"}
                        </button>

                        <Link
                           to="/admin/products"
                           className="rounded-full border border-stone-300 px-6 py-3 text-sm font-bold"
                        >
                           Cancel
                        </Link>
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
                           className="mt-6 w-full cursor-pointer rounded-xl bg-[#315C3B] px-5 py-3 text-sm font-semibold text-white hover:bg-[#26492E]"
                        >
                           OK
                        </button>
                     </div>
                  </div>
               )}
            </main>
         </div>
      </div>
   );
};

export default EditProduct;
