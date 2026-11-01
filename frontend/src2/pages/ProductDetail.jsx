import { Link } from "react-router-dom";
const Product = () => {
   return (
      <>
         <section className="mx-auto max-w-6xl px-5 py-10">
            <p className="text-[10px] text-ink/50">
               Home / Shop / Vegetables / Tomato
            </p>

            {/* Product Details */}
            <div className="mt-6 grid items-center gap-9 md:grid-cols-2">
               <img
                  src="/assets/tomato.jpg"
                  alt="Fresh red tomatoes"
                  className="h-[360px] w-full rounded-3xl object-cover md:h-[470px]"
               />

               <div>
                  <p className="text-[10px] font-bold tracking-widest text-forest">
                     VEGETABLES · FARM FRESH
                  </p>

                  <h1 className="mt-3 font-serif text-4xl font-bold">
                     Farm Fresh Tomato
                  </h1>

                  <p className="mt-3 text-xs text-ink/60">
                     Fresh harvest · 1 kg · Locally sourced
                  </p>

                  <p className="mt-5 font-serif text-3xl font-bold text-forest">
                     ₹40
                  </p>

                  <div className="mt-5 inline-flex items-center gap-4 rounded-full border border-forest/15 bg-white px-4 py-2">
                     <button type="button" aria-label="Decrease quantity">−</button>
                     <span>1</span>
                     <button type="button" aria-label="Increase quantity">+</button>
                  </div>

                  <button
                     type="button"
                     className="ml-2 mt-5 rounded-full bg-forest px-7 py-4 text-xs font-semibold text-white hover:bg-leaf cursor-pointer"
                  >
                     Add to Basket
                  </button>

                  <p className="mt-6 text-xs leading-7 text-ink/75">
                     Juicy, sun-ripened tomatoes sourced from local farms. A
                     kitchen essential for curries, salads, chutneys and homemade
                     sauces.
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3 text-[10px]">
                     <div className="rounded-xl bg-sage p-4">
                        ♧ &nbsp; Grown with care
                     </div>
                     <div className="rounded-xl bg-sage p-4">
                        🚚 &nbsp; Local delivery
                     </div>
                  </div>

                  <p className="mt-4 text-[10px] text-ink/55">
                     Freshness and availability may vary by harvest.
                  </p>
               </div>
            </div>

            {/* Related Products */}
            <div className="mt-14">
               <h2 className="font-serif text-2xl font-bold">
                  You may also like
               </h2>

               <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
                  <article className="rounded-2xl border border-[#eee9dc] bg-[#fffdf8] p-1.5 shadow-sm">
                     <Link to="/product" className="relative block overflow-hidden rounded-xl bg-sand">
                        <img
                           src="/assets/carrot.jpg"
                           alt="Carrot"
                           className="h-36 w-full object-cover transition duration-300 hover:scale-105"
                        />
                        <span className="absolute left-2 top-2 rounded-full bg-forest px-2 py-1 text-[9px] text-white">
                           Fresh
                        </span>
                     </Link>
                     <div className="px-2 pb-2 pt-2">
                        <Link to="/product" className="text-[11px] font-semibold">Carrot</Link>
                        <p className="mt-1 text-[10px] text-ink/60">Organic · 1 kg</p>
                        <p className="mt-2 text-sm font-bold text-forest">₹50</p>
                        <button type="button" className="mt-2 w-full rounded-lg bg-forest px-2 py-2 text-[10px] font-semibold text-white hover:bg-leaf cursor-pointer">
                           🛒 &nbsp; Add to Cart
                        </button>
                     </div>
                  </article>

                  <article className="rounded-2xl border border-[#eee9dc] bg-[#fffdf8] p-1.5 shadow-sm">
                     <Link to="/product" className="relative block overflow-hidden rounded-xl bg-sand">
                        <img
                           src="/assets/banana.jpg"
                           alt="Banana"
                           className="h-36 w-full object-cover transition duration-300 hover:scale-105"
                        />
                        <span className="absolute left-2 top-2 rounded-full bg-forest px-2 py-1 text-[9px] text-white">
                           Fresh
                        </span>
                     </Link>
                     <div className="px-2 pb-2 pt-2">
                        <Link to="/product" className="text-[11px] font-semibold">Banana</Link>
                        <p className="mt-1 text-[10px] text-ink/60">Farm Fresh · 1 kg</p>
                        <p className="mt-2 text-sm font-bold text-forest">₹60</p>
                        <button type="button" className="mt-2 w-full rounded-lg bg-forest px-2 py-2 text-[10px] font-semibold text-white hover:bg-leaf cursor-pointer">
                           🛒 &nbsp; Add to Cart
                        </button>
                     </div>
                  </article>

                  <article className="rounded-2xl border border-[#eee9dc] bg-[#fffdf8] p-1.5 shadow-sm">
                     <Link to="/product" className="relative block overflow-hidden rounded-xl bg-sand">
                        <img
                           src="/assets/spinach.jpg"
                           alt="Spinach"
                           className="h-36 w-full object-cover transition duration-300 hover:scale-105"
                        />
                        <span className="absolute left-2 top-2 rounded-full bg-forest px-2 py-1 text-[9px] text-white">
                           Fresh
                        </span>
                     </Link>
                     <div className="px-2 pb-2 pt-2">
                        <Link to="/product" className="text-[11px] font-semibold">Spinach</Link>
                        <p className="mt-1 text-[10px] text-ink/60">Organic · 500 g</p>
                        <p className="mt-2 text-sm font-bold text-forest">₹30</p>
                        <button type="button" className="mt-2 w-full rounded-lg bg-forest px-2 py-2 text-[10px] font-semibold text-white hover:bg-leaf cursor-pointer">
                           🛒 &nbsp; Add to Cart
                        </button>
                     </div>
                  </article>

                  <article className="rounded-2xl border border-[#eee9dc] bg-[#fffdf8] p-1.5 shadow-sm">
                     <Link to="/product" className="relative block overflow-hidden rounded-xl bg-sand">
                        <img
                           src="/assets/ragi.jpg"
                           alt="Ragi (Finger Millet)"
                           className="h-36 w-full object-cover transition duration-300 hover:scale-105"
                        />
                        <span className="absolute left-2 top-2 rounded-full bg-orange-700 px-2 py-1 text-[9px] text-white">
                           Healthy
                        </span>
                     </Link>
                     <div className="px-2 pb-2 pt-2">
                        <Link to="/product" className="text-[11px] font-semibold">Ragi (Finger Millet)</Link>
                        <p className="mt-1 text-[10px] text-ink/60">Organic · 1 kg</p>
                        <p className="mt-2 text-sm font-bold text-forest">₹80</p>
                        <button type="button" className="mt-2 w-full rounded-lg bg-forest px-2 py-2 text-[10px] font-semibold text-white hover:bg-leaf cursor-pointer">
                           🛒 &nbsp; Add to Cart
                        </button>
                     </div>
                  </article>
               </div>
            </div>
         </section>
      </>
   )
}

export default Product;