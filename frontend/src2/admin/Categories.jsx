
import { useState } from "react";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";

const categories = [
  {
    id: 1,
    name: "Vegetables",
    description: "Fresh farm vegetables",
    status: "Active",
  },
  {
    id: 2,
    name: "Fruits",
    description: "Fresh seasonal fruits",
    status: "Active",
  },
  {
    id: 3,
    name: "Millets",
    description: "Healthy traditional millets",
    status: "Active",
  },
];

function Categories() {
  const [popup, setPopup] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const closePopup = () => {
    setPopup("");
    setSelectedCategory(null);
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
              onClick={() => setPopup("add")}
              className="rounded-xl bg-[#315C3B] px-5 py-3 font-medium text-white hover:bg-[#26492E]"
            >
              + Add Category
            </button>
          </div>

          {/* Summary Card */}
          <div className="mb-6 rounded-2xl border border-stone-200 bg-white p-5">
            <p className="text-sm text-stone-500">Total Categories</p>
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
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Description</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-stone-100">
                  {categories.map((category) => (
                    <tr key={category.id} className="hover:bg-stone-50">
                      <td className="px-6 py-5 font-medium text-stone-800">
                        {category.name}
                      </td>

                      <td className="px-6 py-5 text-sm text-stone-500">
                        {category.description}
                      </td>

                      <td className="px-6 py-5">
                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                          {category.status}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex gap-3">
                          <button
                            onClick={() => {
                              setSelectedCategory(category);
                              setPopup("edit");
                            }}
                            className="text-sm font-medium text-[#315C3B] hover:underline cursor-pointer"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => {
                              setSelectedCategory(category);
                              setPopup("delete");
                            }}
                            className="text-sm font-medium text-red-500 hover:underline cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
           </main>
           </div>

      {/* Add / Edit Popup */}
      {(popup === "add" || popup === "edit") && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-stone-800">
                  {popup === "add" ? "Add Category" : "Edit Category"}
                </h2>
                <p className="mt-1 text-sm text-stone-500">
                  {popup === "add"
                    ? "Enter details for your new category."
                    : "Update your category details."}
                </p>
              </div>

              <button
                onClick={closePopup}
                className="text-2xl text-stone-400 hover:text-stone-700"
              >
                &times;
              </button>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-5"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">
                  Category Name
                </label>
                <input
                  type="text"
                  defaultValue={selectedCategory?.name || ""}
                  placeholder="e.g. Organic Vegetables"
                  className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-[#315C3B]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">
                  Description
                </label>
                <textarea
                  rows="3"
                  defaultValue={selectedCategory?.description || ""}
                  placeholder="Enter category description"
                  className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-[#315C3B]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">
                  Status
                </label>
                <select
                  defaultValue={selectedCategory?.status || "Active"}
                  className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#315C3B]"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closePopup}
                  className="rounded-xl border border-stone-200 px-5 py-3 text-sm font-medium text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={closePopup}
                  className="rounded-xl bg-[#315C3B] px-5 py-3 text-sm font-semibold text-white hover:bg-[#26492E]"
                >
                  {popup === "add" ? "Save Category" : "Update Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {popup === "delete" && (
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
                {selectedCategory?.name}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-7 flex justify-center gap-3">
              <button
                onClick={closePopup}
                className="rounded-xl border border-stone-200 px-5 py-3 text-sm font-medium text-stone-600 hover:bg-stone-50"
              >
                Cancel
              </button>

              <button
                onClick={closePopup}
                className="rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white hover:bg-red-600"
              >
                Delete Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;