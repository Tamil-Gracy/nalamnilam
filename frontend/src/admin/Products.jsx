
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import axios from "axios";

function Products() {
   const navigate = useNavigate();

   const [products, setProducts] = useState([]);
   const [categories, setCategories] = useState([]);
   const [selectedProduct, setSelectedProduct] = useState(null);
   const [popup, setPopup] = useState("");
   const [message, setMessage] = useState("");
   const [messageType, setMessageType] = useState("success");

   const API = import.meta.env.VITE_API_URL;

   // Fetch products and categories
   const fetchProducts = async () => {
      try {
         const productResponse = await axios.get(
            `${API}/api/products`
         );

         setProducts(productResponse.data.data || []);

         const categoryResponse = await axios.get(
            `${API}/api/categories`
         );

         setCategories(categoryResponse.data.data || []);
      } catch (error) {
         console.error("Failed to fetch data:", error);
      }
   };

   // Load data when the page opens
   useEffect(() => {
      fetchProducts();
   }, []);

   // Open delete confirmation
   const openDeletePopup = (product) => {
      setSelectedProduct(product);
      setPopup("delete");
   };

   // Close popup
   const closePopup = () => {
      setPopup("");
      setSelectedProduct(null);
   };

   // Show success or error popup
   const showMessage = (type, text) => {
      setMessageType(type);
      setMessage(text);
      setPopup("message");
   };

   // Delete product
   const handleDelete = async () => {
      if (!selectedProduct?._id) return;

      try {
         const res = await axios.delete(
            `${API}/api/products/${selectedProduct._id}`
         );

         // Refresh the product list immediately
         await fetchProducts();

         setSelectedProduct(null);

         showMessage(
            "success",
            res.data.message || "Product deleted successfully!"
         );
      } catch (err) {
         console.error(
            "Error deleting product:",
            err.response?.data || err.message
         );

         showMessage(
            "error",
            err.response?.data?.message ||
            "Failed to delete product."
         );
      }
   };

   return (
      <div className="flex min-h-screen bg-stone-50">
         <SideBar />

         <div className="min-w-0 flex-1">
            <TopBar />

            <main className="p-6">
               <div className="mb-6 flex items-center justify-between">
                  <div>
                     <h1 className="text-2xl font-bold text-[#315C3B]">
                        Products
                     </h1>

                     <p className="mt-1 text-sm text-stone-500">
                        Manage your organic store products.
                     </p>
                  </div>

                  <Link
                     to="/admin/addproduct"
                     className="cursor-pointer rounded-lg bg-[#315C3B] px-4 py-2 text-white hover:bg-[#25472d]"
                  >
                     + Add Product
                  </Link>
               </div>

               {/* Product count */}
               <div className="mb-4 rounded-xl border border-stone-200 bg-white p-4">
                  <p className="text-sm text-stone-500">
                     Total Products
                  </p>

                  <p className="mt-1 text-2xl font-bold text-[#315C3B]">
                     {products.length}
                  </p>
               </div>

               {/* Products table */}
               <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white">
                  <table className="w-full text-left text-sm">
                     <thead className="bg-stone-100 text-stone-600">
                        <tr>
                           <th className="p-4">Product</th>
                           <th className="p-4">Category</th>
                           <th className="p-4">Price</th>
                           <th className="p-4">Stock</th>
                           <th className="p-4">Status</th>
                           <th className="p-4">Actions</th>
                        </tr>
                     </thead>

                     <tbody>
                        {products.length === 0 ? (
                           <tr>
                              <td
                                 colSpan="6"
                                 className="p-8 text-center text-stone-500"
                              >
                                 No products found.
                              </td>
                           </tr>
                        ) : (
                           products.map((product) => (
                              <tr
                                 key={product._id}
                                 className="border-t border-stone-100"
                              >
                                 <td className="p-4">
                                    <div className="flex items-center gap-3">
                                       {product.image && (
                                          <img
                                             src={`${API}${product.image}`}
                                             alt={product.name}
                                             className="h-12 w-12 rounded-lg object-cover"
                                          />
                                       )}

                                       <div>
                                          <p className="font-semibold text-stone-800">
                                             {product.name}
                                          </p>

                                          <p className="text-xs text-stone-500">
                                             {product.quantity}{product.unit}
                                          </p>
                                       </div>
                                    </div>
                                 </td>

                                 <td className="p-4 text-stone-600">
                                    {product.category?.name || "Uncategorized"}
                                 </td>

                                 <td className="p-4 font-medium">
                                    ₹{product.price}
                                 </td>

                                 <td className="p-4">{product.stock}</td>

                                 <td className="p-4">
                                    <span
                                       className={`rounded-full px-3 py-1 text-xs ${product.status
                                             ? "bg-green-100 text-green-700"
                                             : "bg-stone-200 text-stone-600"
                                          }`}
                                    >
                                       {product.status ? "Active" : "Inactive"}
                                    </span>
                                 </td>

                                 <td className="p-4">
                                    <div className="flex gap-3">
                                       <button
                                          type="button"
                                          onClick={() =>
                                             navigate("/admin/editproduct", {
                                                state: { product },
                                             })
                                          }
                                          className="cursor-pointer font-medium text-blue-600 hover:underline"
                                       >
                                          Edit
                                       </button>

                                       <button
                                          type="button"
                                          onClick={() =>
                                             openDeletePopup(product)
                                          }
                                          className="cursor-pointer text-sm font-medium text-red-500 hover:underline"
                                       >
                                          Delete
                                       </button>
                                    </div>
                                 </td>
                              </tr>
                           ))
                        )}
                     </tbody>
                  </table>
               </div>

               {/* Delete confirmation popup */}
               {popup === "delete" && selectedProduct && (
                  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
                     <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.8}
                              stroke="currentColor"
                              className="h-7 w-7"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 d="M12 9v4m0 4h.01M10.3 3.9 2.8 17a2 2 0 0 0 1.74 3h14.92a2 2 0 0 0 1.74-3l-7.46-13.1a2 2 0 0 0-3.48 0Z"
                              />
                           </svg>
                        </div>

                        <h2 className="text-xl font-bold text-stone-800">
                           Delete Product?
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-stone-500">
                           Are you sure you want to delete{" "}
                           <span className="font-semibold text-stone-700">
                              {selectedProduct.name}
                           </span>
                           ? This action cannot be undone.
                        </p>

                        <div className="mt-7 flex justify-center gap-3">
                           <button
                              type="button"
                              onClick={closePopup}
                              className="rounded-xl border border-stone-200 px-5 py-3 text-sm font-medium text-stone-600 hover:bg-stone-50 cursor-pointer"
                           >
                              Cancel
                           </button>

                           <button
                              type="button"
                              onClick={handleDelete}
                              className="rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white hover:bg-red-600 cursor-pointer"
                           >
                              Delete Product
                           </button>
                        </div>
                     </div>
                  </div>
               )}

               {/* Success and error popup */}
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
                           {messageType === "success"
                              ? "Success!"
                              : "Error!"}
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
}

export default Products;
