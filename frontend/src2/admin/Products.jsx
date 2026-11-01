
import { useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";

const products = [
  {
    id: 1,
    name: "Country Tomatoes",
    category: "Vegetables",
    price: 38,
    unit: "500 g",
    stock: 18,
    stockUnit: "kg",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=900&q=90",
  },
  {
    id: 2,
    name: "Baby Spinach",
    category: "Vegetables",
    price: 25,
    unit: "bunch",
    stock: 6,
    stockUnit: "bunches",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=900&q=90",
  },
  {
    id: 3,
    name: "Farm Carrots",
    category: "Vegetables",
    price: 42,
    unit: "500 g",
    stock: 12,
    stockUnit: "kg",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=900&q=90",
  },
  {
    id: 4,
    name: "Seasonal Mangoes",
    category: "Fruits",
    price: 95,
    unit: "kg",
    stock: 4,
    stockUnit: "kg",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=900&q=90",
  },
  {
    id: 5,
    name: "Red Apples",
    category: "Fruits",
    price: 120,
    unit: "kg",
    stock: 22,
    stockUnit: "kg",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=900&q=90",
  },
  {
    id: 6,
    name: "Fresh Oranges",
    category: "Fruits",
    price: 70,
    unit: "kg",
    stock: 9,
    stockUnit: "kg",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=900&q=90",
  },
];

const Products = () => {
  const [popup, setPopup] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const inputStyle =
    "w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#315C3B]";

  const closePopup = () => {
    setPopup("");
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[250px_1fr]">
      <SideBar />

      <div className="min-w-0">
        <TopBar />

        <main className="p-5 sm:p-8">
          {/* Page Header */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-stone-800">
                Products
              </h1>
              <p className="mt-1 text-sm text-stone-500">
                Maintain product details, prices and visibility.
              </p>
            </div>

            <Link
              to="/admin/addproduct"
              className="rounded-full bg-[#315C3B] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#24472D]"
            >
              + Add Product
            </Link>
          </div>

          {/* Search and Filters - UI Only */}
          <div className="mt-6 flex flex-wrap gap-3">
            <input
              type="text"
              placeholder="Search products..."
              className={`${ inputStyle } min - w - [220px] flex - 1`}
            />

            <select defaultValue="All" className={inputStyle + " sm:w-auto"}>
              <option value="All">All Categories</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Millets">Millets</option>
            </select>

            <select defaultValue="All" className={inputStyle + " sm:w-auto"}>
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          {/* Products Table */}
          <div className="mt-5 overflow-x-auto rounded-2xl border border-stone-200 bg-white">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-stone-50 text-xs uppercase tracking-wider text-stone-500">
                <tr>
                  <th className="px-5 py-4">Product</th>
                  <th className="px-5 py-4">Price</th>
                  <th className="px-5 py-4">Stock</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-t border-stone-100 transition hover:bg-stone-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />

                        <div>
                          <p className="font-bold text-stone-800">
                            {product.name}
                          </p>
                          <p className="mt-1 text-xs text-stone-500">
                            {product.category}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      ₹{product.price} / {product.unit}
                    </td>

                    <td className="px-5 py-4">
                      {product.stock} {product.stockUnit}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800">
                        {product.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedProduct(product);
                            setPopup("edit");
                          }}
                          className="cursor-pointer font-bold text-[#315C3B] hover:underline"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedProduct(product);
                            setPopup("delete");
                          }}
                          className="cursor-pointer font-bold text-red-500 hover:underline"
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

          <p className="mt-4 text-sm text-stone-500">
            Showing {products.length} products
          </p>
        </main>
      </div>

      {/* EDIT PRODUCT POPUP - UI ONLY */}
      {popup === "edit" && selectedProduct && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closePopup();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl sm:p-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-stone-800">
                  Edit Product
                </h2>
                <p className="mt-1 text-sm text-stone-500">
                  Update product details.
                </p>
              </div>

              <button
                type="button"
                onClick={closePopup}
                className="text-2xl text-stone-500 hover:text-stone-900"
              >
                &times;
              </button>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-stone-700">
                  Product Name
                </label>
                <input
                  type="text"
                  defaultValue={selectedProduct.name}
                  className={inputStyle}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-stone-700">
                  Category
                </label>
                <select
                  defaultValue={selectedProduct.category}
                  className={inputStyle}
                >
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Millets">Millets</option>
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-stone-700">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    defaultValue={selectedProduct.price}
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-stone-700">
                    Selling Unit
                  </label>
                  <select
                    defaultValue={selectedProduct.unit}
                    className={inputStyle}
                  >
                    <option value="kg">kg</option>
                    <option value="500 g">500 g</option>
                    <option value="250 g">250 g</option>
                    <option value="bunch">bunch</option>
                    <option value="piece">piece</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-stone-700">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    defaultValue={selectedProduct.stock}
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-stone-700">
                    Stock Unit
                  </label>
                  <select
                    defaultValue={selectedProduct.stockUnit}
                    className={inputStyle}
                  >
                    <option value="kg">kg</option>
                    <option value="bunches">bunches</option>
                    <option value="pieces">pieces</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-stone-700">
                  Status
                </label>
                <select
                  defaultValue={selectedProduct.status}
                  className={inputStyle}
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-stone-700">
                  Image URL
                </label>
                <input
                  type="url"
                  defaultValue={selectedProduct.image}
                  className={inputStyle}
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-stone-100 pt-5">
                <button
                  type="button"
                  onClick={closePopup}
                  className="rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={closePopup}
                  className="rounded-full bg-[#315C3B] px-6 py-3 text-sm font-semibold text-white hover:bg-[#24472D]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION POPUP - UI ONLY */}
      {popup === "delete" && selectedProduct && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closePopup();
          }}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            className="w-full max-w-md rounded-2xl bg-white p-7 text-center shadow-xl"
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <span className="text-3xl font-bold text-red-600">!</span>
            </div>

            <h2 className="text-xl font-bold text-stone-800">
              Delete Product?
            </h2>

            <p className="mt-3 text-sm leading-6 text-stone-500">
              Are you sure you want to delete{" "}
              <span className="font-bold text-stone-800">
                {selectedProduct.name}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-7 flex justify-center gap-3">
              <button
                type="button"
                onClick={closePopup}
                className="rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={closePopup}
                className="rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;