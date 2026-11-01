import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Shop = () => {
   return (
      <>
         <section className="mx-auto max-w-7xl px-5 py-9">

         {/* Page Banner */}
         <div className="rounded-3xl bg-sage px-7 py-8">
            <p className="text-[10px] font-bold tracking-widest text-forest">
               FROM OUR FIELDS TO YOUR TABLE
            </p>

            <h1 className="mt-2 font-serif text-4xl font-bold">
               Shop Fresh Produce
            </h1>

            <p className="mt-3 max-w-2xl text-xs leading-6 text-ink/70">
               Browse seasonal vegetables, fruits and wholesome millets,
               harvested with care and delivered fresh from local farms.
            </p>
         </div>

         {/* Filters and Products */}
         <div className="mt-7 grid gap-6 lg:grid-cols-[230px_1fr]">

            {/* Sidebar Filters */}
            <aside className="h-fit rounded-3xl border border-forest/10 bg-white p-5">

               <div className="flex justify-between">
                  <h2 className="font-serif text-xl font-bold">Filters</h2>
                  <span className="text-[10px] text-forest underline">
                     Clear all
                  </span>
               </div>

               <hr className="my-4" />

               <h3 className="text-xs font-semibold">Category</h3>

               <div className="mt-3 grid gap-3 text-[11px]">
                  <label>
                     <input type="checkbox" className="accent-forest" />
                     {" "}Vegetables
                  </label>

                  <label>
                     <input type="checkbox" className="accent-forest" />
                     {" "}Fruits
                  </label>

                  <label>
                     <input type="checkbox" className="accent-forest" />
                     {" "}Millets
                  </label>
               </div>

               <hr className="my-4" />

               <h3 className="text-xs font-semibold">Price range</h3>

               <input
                  type="range"
                  min="30"
                  max="200"
                  defaultValue="200"
                  className="mt-4 w-full accent-forest"
               />

               <div className="flex justify-between text-[10px] text-ink/60">
                  <span>₹30</span>
                  <span>₹200</span>
               </div>

               <hr className="my-4" />

               <label className="text-[11px]">
                  <input type="checkbox" className="accent-forest" />
                  {" "}Organic only
               </label>

            </aside>

            {/* Product Listing */}
            <section>

               <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs text-ink/60">
                     Showing 5 fresh products
                  </p>

                  <label className="text-[11px]">
                     Sort by

                     <select className="ml-2 rounded-xl border border-forest/15 bg-white px-3 py-2">
                        <option>Featured</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Name: A to Z</option>
                     </select>
                  </label>
               </div>

               <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">

                  {/* Tomato */}
                  <article className="rounded-2xl border border-[#eee9dc] bg-[#fffdf8] p-1.5 shadow-sm">
                     <Link
                        to="/product"
                        className="relative block overflow-hidden rounded-xl bg-sand"
                     >
                        <img
                           src="../../images/tomato.jpg"
                           alt="Tomato"
                           className="h-36 w-full object-cover"
                        />

                        <span className="absolute left-2 top-2 rounded-full bg-forest px-2 py-1 text-[9px] text-white">
                           Fresh
                        </span>
                     </Link>

                     <div className="px-2 pb-2 pt-2">
                        <Link to="/product" className="text-[11px] font-semibold">
                           Tomato
                        </Link>

                        <p className="mt-1 text-[10px] text-ink/60">
                           Organic · 1 kg
                        </p>

                        <p className="mt-2 text-sm font-bold text-forest">
                           ₹ 40
                        </p>

                           <button className="mt-2 w-full rounded-lg bg-forest px-2 py-2 text-[10px] font-semibold text-white cursor-pointer">
                           🛒 &nbsp; Add to Cart
                        </button>
                     </div>
                  </article>

                  {/* Carrot */}
                  <article className="rounded-2xl border border-[#eee9dc] bg-[#fffdf8] p-1.5 shadow-sm">
                     <Link
                        to="/product"
                        className="relative block overflow-hidden rounded-xl bg-sand"
                     >
                        <img
                           src="../../images/carrot.jpg"
                           alt="Carrot"
                           className="h-36 w-full object-cover"
                        />

                        <span className="absolute left-2 top-2 rounded-full bg-forest px-2 py-1 text-[9px] text-white">
                           Fresh
                        </span>
                     </Link>

                     <div className="px-2 pb-2 pt-2">
                        <Link to="/product" className="text-[11px] font-semibold">
                           Carrot
                        </Link>

                        <p className="mt-1 text-[10px] text-ink/60">
                           Organic · 1 kg
                        </p>

                        <p className="mt-2 text-sm font-bold text-forest">
                           ₹ 50
                        </p>

                           <button className="mt-2 w-full rounded-lg bg-forest px-2 py-2 text-[10px] font-semibold text-white cursor-pointer">
                           🛒 &nbsp; Add to Cart
                        </button>
                     </div>
                  </article>

                  {/* Banana */}
                  <article className="rounded-2xl border border-[#eee9dc] bg-[#fffdf8] p-1.5 shadow-sm">
                     <Link
                        to="/product"
                        className="relative block overflow-hidden rounded-xl bg-sand"
                     >
                        <img
                           src="../../images/banana.jpg"
                           alt="Banana"
                           className="h-36 w-full object-cover"
                        />

                        <span className="absolute left-2 top-2 rounded-full bg-forest px-2 py-1 text-[9px] text-white">
                           Fresh
                        </span>
                     </Link>

                     <div className="px-2 pb-2 pt-2">
                        <Link to="/product" className="text-[11px] font-semibold">
                           Banana
                        </Link>

                        <p className="mt-1 text-[10px] text-ink/60">
                           Farm Fresh · 1 kg
                        </p>

                        <p className="mt-2 text-sm font-bold text-forest">
                           ₹ 60
                        </p>

                           <button className="mt-2 w-full rounded-lg bg-forest px-2 py-2 text-[10px] font-semibold text-white cursor-pointer">
                           🛒 &nbsp; Add to Cart
                        </button>
                     </div>
                  </article>

                  {/* Spinach */}
                  <article className="rounded-2xl border border-[#eee9dc] bg-[#fffdf8] p-1.5 shadow-sm">
                     <Link
                        to="/product"
                        className="relative block overflow-hidden rounded-xl bg-sand"
                     >
                        <img
                           src="../../images/spinach.jpg"
                           alt="Spinach"
                           className="h-36 w-full object-cover"
                        />

                        <span className="absolute left-2 top-2 rounded-full bg-forest px-2 py-1 text-[9px] text-white">
                           Fresh
                        </span>
                     </Link>

                     <div className="px-2 pb-2 pt-2">
                        <Link to="/product" className="text-[11px] font-semibold">
                           Spinach
                        </Link>

                        <p className="mt-1 text-[10px] text-ink/60">
                           Organic · 500 g
                        </p>

                        <p className="mt-2 text-sm font-bold text-forest">
                           ₹ 30
                        </p>

                           <button className="mt-2 w-full rounded-lg bg-forest px-2 py-2 text-[10px] font-semibold text-white cursor-pointer">
                           🛒 &nbsp; Add to Cart
                        </button>
                     </div>
                  </article>

                  {/* Ragi */}
                  <article className="rounded-2xl border border-[#eee9dc] bg-[#fffdf8] p-1.5 shadow-sm">
                     <Link
                        to="/product"
                        className="relative block overflow-hidden rounded-xl bg-sand"
                     >
                        <img
                           src="../../images/ragi.jpg"
                           alt="Ragi (Finger Millet)"
                           className="h-36 w-full object-cover"
                        />

                        <span className="absolute left-2 top-2 rounded-full bg-orange-700 px-2 py-1 text-[9px] text-white">
                           Healthy
                        </span>
                     </Link>

                     <div className="px-2 pb-2 pt-2">
                        <Link to="/product" className="text-[11px] font-semibold">
                           Ragi (Finger Millet)
                        </Link>

                        <p className="mt-1 text-[10px] text-ink/60">
                           Organic · 1 kg
                        </p>

                        <p className="mt-2 text-sm font-bold text-forest">
                           ₹ 80
                        </p>

                           <button className="mt-2 w-full rounded-lg bg-forest px-2 py-2 text-[10px] font-semibold text-white cursor-pointer">
                           🛒 &nbsp; Add to Cart
                        </button>
                     </div>
                  </article>

               </div>
               </section>
            </div>
         </section>

      </>
   )
}

export default Shop;