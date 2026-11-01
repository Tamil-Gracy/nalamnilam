import { useState, useEffect } from "react";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

function Categories() {
   const [categories, setCategories] = useState([]);
   const [selectedCategory, setSelectedCategory] = useState(null);

   const [popup, setPopup] = useState("");
   const [message, setMessage] = useState("");
   const [messageType, setMessageType] = useState("success");

   const [addFormData, setAddFormData] = useState({
      name: "",
      description: "",
      image: null,
      status: "true",
   });

   const [editFormData, setEditFormData] = useState({
      name: "",
      description: "",
      image: null,
      status: "true",
   });

   // Fetch categories
   const fetchCategories = async () => {
      try {
         const res = await axios.get(`${API}/api/categories`);
         setCategories(res.data.data);
      } catch (err) {
         console.log("Error fetching categories:", err.response?.data);
      }
   };

   useEffect(() => {
      fetchCategories();
   }, []);

   // Close popup
   const closePopup = () => {
      setPopup("");
      setSelectedCategory(null);
   };

   // Show success or error popup
   const showMessage = (type, text) => {
      setMessageType(type);
      setMessage(text);
      setPopup("message");
   };

   // Open edit popup
   const openEditPopup = (category) => {
      setSelectedCategory(category);
      setEditFormData({
         name: category.name,
         description: category.description || "",
         image: null,
         status: String(category.status),
      });

      setPopup("edit");
   };

   // Open delete confirmation
   const openDeletePopup = (category) => {
      setSelectedCategory(category);
      setPopup("delete");
   };

   // Add category
   const handleAdd = async (e) => {
      e.preventDefault();

      if (!addFormData.image) {
         showMessage("error", "Please select a category image.");
         return;
      }

      const formData = new FormData();
      formData.append("name", addFormData.name);
      formData.append("description", addFormData.description);
      formData.append("status", addFormData.status);
      formData.append("image", addFormData.image);

      try {
         const res = await axios.post(
            `${API}/api/categories`,
            formData
         );

         await fetchCategories();

         setAddFormData({
            name: "",
            description: "",
            image: null,
            status: "true",
         });

         showMessage(
            "success",
            res.data.message || "Category added successfully!"
         );
      } catch (err) {
         console.error("Error adding category:", err.response?.data);

         showMessage(
            "error",
            err.response?.data?.message || "Failed to add category."
         );
      }
   };

   // Update category
   const handleUpdate = async (e) => {
      e.preventDefault();

      if (!selectedCategory?._id) return;

      const formData = new FormData();
      formData.append("name", editFormData.name);
      formData.append("description", editFormData.description);
      formData.append("status", editFormData.status);

      if (editFormData.image) {
         formData.append("image", editFormData.image);
      }

      try {
         const res = await axios.put(
            `${API}/api/categories/${selectedCategory._id}`,
            formData
         );

         await fetchCategories();

         showMessage(
            "success",
            res.data.message || "Category updated successfully!"
         );
      } catch (err) {
         console.error("Error updating category:", err.response?.data);

         showMessage(
            "error",
            err.response?.data?.message || "Failed to update category."
         );
      }
   };

   // Delete category
   const handleDelete = async () => {
      if (!selectedCategory?._id) return;

      try {
         const res = await axios.delete(
            `${API}/api/categories/${selectedCategory._id}`
         );

         await fetchCategories();

         showMessage(
            "success",
            res.data.message || "Category deleted successfully!"
         );
      } catch (err) {
         console.error("Error deleting category:", err.response?.data);

         showMessage(
            "error",
            err.response?.data?.message || "Failed to delete category."
         );
      }
   };

   return (
      <div className="min-h-screen lg:grid lg:grid-cols-[250px_1fr]">
         <SideBar />

         <div>
            <TopBar />

            <main className="p-5 sm:p-8">
               {/* Page Header */}
               <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                     <h1 className="text-2xl font-bold text-stone-800">
                        Categories
                     </h1>

                     <p className="mt-1 text-sm text-stone-500">
                        Manage product categories for Nalam Nilam.
                     </p>
                  </div>

                  <button
                     type="button"
                     onClick={() => setPopup("add")}
                     className="rounded-xl bg-[#315C3B] px-5 py-3 font-medium text-white hover:bg-[#26492E] cursor-pointer"
                  >
                     + Add Category
                  </button>
               </div>

               {/* Total Categories */}
               <div className="mb-6 rounded-2xl border border-stone-200 bg-white p-5">
                  <p className="text-sm text-stone-500">
                     Total Categories
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-[#315C3B]">
                     {categories.length}
                  </h2>
               </div>

               {/* Categories Table */}
               <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
                  <div className="border-b border-stone-100 p-5">
                     <h2 className="font-semibold text-stone-800">
                        All Categories
                     </h2>
                  </div>

                  <div className="overflow-x-auto">
                     <table className="w-full min-w-[650px] text-left">
                        <thead className="bg-stone-50 text-xs uppercase text-stone-500">
                           <tr>
                              <th className="px-6 py-4">Image</th>
                              <th className="px-6 py-4">Category</th>
                              <th className="px-6 py-4">Description</th>
                              <th className="px-6 py-4">Status</th>
                              <th className="px-6 py-4">Actions</th>
                           </tr>
                        </thead>

                        <tbody className="divide-y divide-stone-100">
                           {categories.map((category) => (
                              <tr
                                 key={category._id}
                                 className="hover:bg-stone-50"
                              >
                                 <td className="px-6 py-5">
                                    <img
                                       src={`${API}${category.image}`}
                                       alt={category.name}
                                       className="h-20 w-20 rounded-lg object-cover"
                                    />
                                 </td>

                                 <td className="px-6 py-5 font-medium text-stone-800">
                                    {category.name}
                                 </td>

                                 <td className="px-6 py-5 text-sm text-stone-500">
                                    {category.description}
                                 </td>

                                 <td className="px-6 py-5">
                                    <span
                                       className={`rounded-full px-3 py-1 text-xs font-medium ${String(category.status) === "true"
                                             ? "bg-green-50 text-green-700"
                                             : "bg-red-50 text-red-600"
                                          }`}
                                    >
                                       {String(category.status) === "true"
                                          ? "Active"
                                          : "Inactive"}
                                    </span>
                                 </td>

                                 <td className="px-6 py-5">
                                    <div className="flex gap-3">
                                       <button
                                          type="button"
                                          onClick={() =>
                                             openEditPopup(category)
                                          }
                                          className="text-sm font-medium text-[#315C3B] hover:underline cursor-pointer"
                                       >
                                          Edit
                                       </button>

                                       <button
                                          type="button"
                                          onClick={() =>
                                             openDeletePopup(category)
                                          }
                                          className="text-sm font-medium text-red-500 hover:underline cursor-pointer"
                                       >
                                          Delete
                                       </button>
                                    </div>
                                 </td>
                              </tr>
                           ))}

                           {categories.length === 0 && (
                              <tr>
                                 <td
                                    colSpan="5"
                                    className="px-6 py-8 text-center text-sm text-stone-500"
                                 >
                                    No categories found.
                                 </td>
                              </tr>
                           )}
                        </tbody>
                     </table>
                  </div>
               </div>
            </main>
         </div>

         {/* Add Category Popup */}
         {popup === "add" && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
               <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                  <div className="mb-6 flex items-start justify-between">
                     <div>
                        <h2 className="text-xl font-bold text-stone-800">
                           Add Category
                        </h2>

                        <p className="mt-1 text-sm text-stone-500">
                           Enter details for your new category.
                        </p>
                     </div>

                     <button
                        type="button"
                        onClick={closePopup}
                        className="text-2xl text-stone-400 hover:text-stone-700 cursor-pointer"
                     >
                        &times;
                     </button>
                  </div>

                  <form onSubmit={handleAdd} className="space-y-5">
                     <div>
                        <label className="mb-2 block text-sm font-medium text-stone-700">
                           Category Name
                        </label>

                        <input
                           type="text"
                           required
                           placeholder="e.g. Organic Vegetables"
                           className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-[#315C3B]"
                           value={addFormData.name}
                           onChange={(e) =>
                              setAddFormData((prev) => ({
                                 ...prev,
                                 name: e.target.value,
                              }))
                           }
                        />
                     </div>

                     <div>
                        <label className="mb-2 block text-sm font-medium text-stone-700">
                           Description
                        </label>

                        <textarea
                           rows="3"
                           placeholder="Enter category description"
                           className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-[#315C3B]"
                           value={addFormData.description}
                           onChange={(e) =>
                              setAddFormData((prev) => ({
                                 ...prev,
                                 description: e.target.value,
                              }))
                           }
                        />
                     </div>

                     <div>
                        <label className="mb-2 block text-sm font-medium text-stone-700">
                           Category Image
                        </label>

                        <input
                           type="file"
                           required
                           accept="image/*"
                           className="w-full text-sm"
                           onChange={(e) =>
                              setAddFormData((prev) => ({
                                 ...prev,
                                 image: e.target.files[0] || null,
                              }))
                           }
                        />
                     </div>

                     <div>
                        <label className="mb-2 block text-sm font-medium text-stone-700">
                           Status
                        </label>

                        <select
                           className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#315C3B]"
                           value={addFormData.status}
                           onChange={(e) =>
                              setAddFormData((prev) => ({
                                 ...prev,
                                 status: e.target.value,
                              }))
                           }
                        >
                           <option value="true">Active</option>
                           <option value="false">Inactive</option>
                        </select>
                     </div>

                     <div className="flex justify-end gap-3 pt-2">
                        <button
                           type="button"
                           onClick={closePopup}
                           className="rounded-xl border border-stone-200 px-5 py-3 text-sm font-medium text-stone-600 hover:bg-stone-50 cursor-pointer"
                        >
                           Cancel
                        </button>

                        <button
                           type="submit"
                           className="rounded-xl bg-[#315C3B] px-5 py-3 text-sm font-semibold text-white hover:bg-[#26492E] cursor-pointer"
                        >
                           Save Category
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         )}

         {/* Edit Category Popup */}
         {popup === "edit" && selectedCategory && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
               <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                  <div className="mb-6 flex items-start justify-between">
                     <div>
                        <h2 className="text-xl font-bold text-stone-800">
                           Edit Category
                        </h2>

                        <p className="mt-1 text-sm text-stone-500">
                           Update your category details.
                        </p>
                     </div>

                     <button
                        type="button"
                        onClick={closePopup}
                        className="text-2xl text-stone-400 hover:text-stone-700 cursor-pointer"
                     >
                        &times;
                     </button>
                  </div>

                  <form onSubmit={handleUpdate} className="space-y-5">
                     <div>
                        <label className="mb-2 block text-sm font-medium text-stone-700">
                           Category Name
                        </label>

                        <input
                           type="text"
                           required
                           className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-[#315C3B]"
                           value={editFormData.name}
                           onChange={(e) =>
                              setEditFormData((prev) => ({
                                 ...prev,
                                 name: e.target.value,
                              }))
                           }
                        />
                     </div>

                     <div>
                        <label className="mb-2 block text-sm font-medium text-stone-700">
                           Description
                        </label>

                        <textarea
                           rows="3"
                           className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-[#315C3B]"
                           value={editFormData.description}
                           onChange={(e) =>
                              setEditFormData((prev) => ({
                                 ...prev,
                                 description: e.target.value,
                              }))
                           }
                        />
                     </div>

                     <div>
                        <label className="mb-2 block text-sm font-medium text-stone-700">
                           Current Image
                        </label>

                        <img
                           src={`${API}${selectedCategory.image}`}
                           alt={selectedCategory.name}
                           className="mb-3 h-20 w-20 rounded-lg object-cover"
                        />

                        <input
                           type="file"
                           accept="image/*"
                           className="w-full text-sm"
                           onChange={(e) =>
                              setEditFormData((prev) => ({
                                 ...prev,
                                 image: e.target.files[0] || null,
                              }))
                           }
                        />
                     </div>

                     <div>
                        <label className="mb-2 block text-sm font-medium text-stone-700">
                           Status
                        </label>

                        <select
                           className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#315C3B]"
                           value={editFormData.status}
                           onChange={(e) =>
                              setEditFormData((prev) => ({
                                 ...prev,
                                 status: e.target.value,
                              }))
                           }
                        >
                           <option value="true">Active</option>
                           <option value="false">Inactive</option>
                        </select>
                     </div>

                     <div className="flex justify-end gap-3 pt-2">
                        <button
                           type="button"
                           onClick={closePopup}
                           className="rounded-xl border border-stone-200 px-5 py-3 text-sm font-medium text-stone-600 hover:bg-stone-50 cursor-pointer"
                        >
                           Cancel
                        </button>

                        <button
                           type="submit"
                           className="rounded-xl bg-[#315C3B] px-5 py-3 text-sm font-semibold text-white hover:bg-[#26492E] cursor-pointer"
                        >
                           Update Category
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         )}

         {/* Delete Confirmation Popup */}
         {popup === "delete" && selectedCategory && (
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
                     Delete Category?
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-stone-500">
                     Are you sure you want to delete{" "}
                     <span className="font-semibold text-stone-700">
                        {selectedCategory.name}
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
                        Delete Category
                     </button>
                  </div>
               </div>
            </div>
         )}

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
   );
}

export default Categories;