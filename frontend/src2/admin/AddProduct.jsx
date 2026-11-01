import { Link } from "react-router-dom";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar"
const AddProduct = () => {
  return (
    <>
    <div className="min-h-screen lg:grid lg:grid-cols-[250px_1fr]">
      <SideBar />
           <div>
              <TopBar />
        <main className="p-5 sm:p-8">
          <div className="max-w-4xl">
            <p className="text-sm text-stone-500">Add the product information customers will see on the storefront.</p>
            <form className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-semibold">
                  Product name
                  <input placeholder="e.g. Country Tomatoes" className="mt-2 block w-full rounded-xl border border-stone-300 px-4 py-3 font-normal" />
                </label>
                <label className="text-sm font-semibold">
                  Category
                  <select className="mt-2 block w-full rounded-xl border border-stone-300 bg-white px-4 py-3 font-normal">
                    <option>Select category</option>
                    <option>Vegetables</option>
                    <option>Fruits</option>
                    <option>Millets</option>
                  </select>
                </label>
                <label className="text-sm font-semibold">
                  Price (₹)
                  <input type="number" placeholder="38" className="mt-2 block w-full rounded-xl border border-stone-300 px-4 py-3 font-normal" />
                </label>
                <label className="text-sm font-semibold">
                  Unit / weight
                  <input placeholder="500 g, 1 kg, bunch" className="mt-2 block w-full rounded-xl border border-stone-300 px-4 py-3 font-normal" />
                </label>
                <label className="text-sm font-semibold">
                  Available stock
                  <input type="number" placeholder="20" className="mt-2 block w-full rounded-xl border border-stone-300 px-4 py-3 font-normal" />
                </label>
                <label className="text-sm font-semibold">
                  Product status
                  <select className="mt-2 block w-full rounded-xl border border-stone-300 bg-white px-4 py-3 font-normal">
                    <option>Active</option>
                    <option>Draft</option>
                    <option>Out of stock</option>
                  </select>
                </label>
                <label className="text-sm font-semibold sm:col-span-2">
                  Image URL
                  <input placeholder="Paste a hosted image URL" className="mt-2 block w-full rounded-xl border border-stone-300 px-4 py-3 font-normal" />
                </label>
                <label className="text-sm font-semibold sm:col-span-2">
                  Description
                  <textarea rows="4" placeholder="Describe sourcing, freshness and storage guidance" className="mt-2 block w-full rounded-xl border border-stone-300 px-4 py-3 font-normal"></textarea>
                </label>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <button type="button" className="rounded-full bg-[#315C3B] px-6 py-3 text-sm font-bold text-white">Save product</button>
                <Link to="/admin/products" className="rounded-full border border-stone-300 px-6 py-3 text-sm font-bold">Cancel</Link>
              </div>
              <p className="mt-4 text-xs text-stone-500">UI only: saving and image upload require backend integration.</p>
            </form>
          </div>
        </main>
      </div>
    </div>
    </>
  );
}

export default AddProduct;
