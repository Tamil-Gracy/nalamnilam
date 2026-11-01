import { Link } from "react-router-dom";

const ProductCard = () => {
   return (
      <>
         <article className="rounded-2xl border border-[#eee9dc] bg-[#fffdf8] p-1.5 shadow-sm">
            <Link
               to="/product"
               className="relative block overflow-hidden rounded-xl bg-sand"
            >
               <img
                  src="../../images/products/vegetables/tomato.jpg"
                  alt="Tomato"
                  className="h-36 w-full object-contain "
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

               <p className="mt-2 text-sm font-bold text-forest">₹ 40</p>

               <button className="mt-2 w-full rounded-lg bg-forest px-2 py-2 text-[10px] font-semibold text-white">
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
                  src="../../images/products/vegetables/carrot.jpg"
                  alt="Carrot"
                  className="h-36 w-full object-contain "
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

               <p className="mt-2 text-sm font-bold text-forest">₹ 50</p>

               <button className="mt-2 w-full rounded-lg bg-forest px-2 py-2 text-[10px] font-semibold text-white">
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
                  src="../../images/products/fruits/banana.jpg"
                  alt="Banana"
                  className="h-36 w-full object-contain "
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

               <p className="mt-2 text-sm font-bold text-forest">₹ 60</p>

               <button className="mt-2 w-full rounded-lg bg-forest px-2 py-2 text-[10px] font-semibold text-white">
                  🛒 &nbsp; Add to Cart
               </button>
            </div>
         </article>

         {/* Cauliflower */}
         <article className="rounded-2xl border border-[#eee9dc] bg-[#fffdf8] p-1.5 shadow-sm">
            <Link
               to="/product"
               className="relative block overflow-hidden rounded-xl bg-sand"
            >
               <img
                  src="../../images/products/vegetables/cauliflower.jpg"
                  alt="cauliflower"
                  className="h-36 w-full object-contain "
               />

               <span className="absolute left-2 top-2 rounded-full bg-forest px-2 py-1 text-[9px] text-white">
                  Fresh
               </span>
            </Link>

            <div className="px-2 pb-2 pt-2">
               <Link to="/product" className="text-[11px] font-semibold">
                  Cauliflower
               </Link>

               <p className="mt-1 text-[10px] text-ink/60">
                  Organic · 500 g
               </p>

               <p className="mt-2 text-sm font-bold text-forest">₹ 30</p>

               <button className="mt-2 w-full rounded-lg bg-forest px-2 py-2 text-[10px] font-semibold text-white">
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
                  src="../../images/products/millets/ragi.jpg"
                  alt="Ragi (Finger Millet)"
                  className="h-36 w-full object-contain"
               />

               <span className="absolute left-2 top-2 rounded-full bg-orange-700 px-2 py-1 text-[9px] text-white">
                  Healthy
               </span>
            </Link>

            <div className="px-2 pb-2 pt-2">
               <Link href="/product" className="text-[11px] font-semibold">
                  Ragi (Finger Millet)
               </Link>

               <p className="mt-1 text-[10px] text-ink/60">
                  Organic · 1 kg
               </p>

               <p className="mt-2 text-sm font-bold text-forest">₹ 80</p>

               <button className="mt-2 w-full rounded-lg bg-forest px-2 py-2 text-[10px] font-semibold text-white">
                  🛒 &nbsp; Add to Cart
               </button>
            </div>
         </article>
      </>
   )
}

export default ProductCard;