
import { useState } from "react";
import { Link } from "react-router-dom";

const initialWishlist = [
   {
      id: "ragi",
      name: "Organic Ragi (Finger Millet)",
      category: "Millets",
      weight: "1 kg",
      price: 80,
      image: "/assets/ragi.jpg",
   },
   {
      id: "green-gram",
      name: "Green Gram",
      category: "Pulses",
      weight: "1 kg",
      price: 120,
      image: "/assets/green-gram.jpg",
   },
   {
      id: "rice",
      name: "Traditional Rice",
      category: "Rice",
      weight: "1 kg",
      price: 95,
      image: "/assets/white-rice.jpg",
   },
   {
      id: "oil",
      name: "Groundnut Oil",
      category: "Oils",
      weight: "1 litre",
      price: 240,
      image: "/assets/groundnut-oil.jpg",
   },
];

const Wishlist = () => {
   const [items, setItems] = useState(initialWishlist);

   const removeItem = (id) => {
      setItems((prev) => prev.filter((item) => item.id !== id));
   };

   const addToCart = (item) => {
      // Connect this to your existing cart context/function.
      console.log("Add to cart:", item);
   };

   return (
      <section className="mx-auto min-h-[65vh] max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

         {/* Breadcrumb */}
         <nav className="mb-6 flex items-center gap-2 text-xs text-ink/55">
            <Link to="/" className="hover:text-forest">
               Home
            </Link>
            <span>/</span>
            <span className="font-medium text-forest">
               My Wishlist
            </span>
         </nav>

         {/* Page Header */}
         <div className="rounded-3xl bg-[#fbf8ef] p-5 sm:p-8">
            <p className="text-[10px] font-bold tracking-[0.2em] text-forest">
               YOUR FAVOURITES
            </p>

            <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
               <div>
                  <h1 className="font-serif text-3xl font-bold text-ink sm:text-4xl">
                     My Wishlist <span className="text-forest">♡</span>
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-ink/60">
                     Save your favourite natural essentials and find them easily
                     whenever you shop.
                  </p>
               </div>

               <span className="w-fit rounded-full border border-forest/15 bg-white px-4 py-2 text-xs font-semibold text-forest">
                  {items.length} saved items
               </span>
            </div>
         </div>

         {/* Empty Wishlist */}
         {items.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-dashed border-forest/20 bg-[#fffdf8] px-5 py-14 text-center">
               <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage text-3xl text-forest">
                  ♡
               </div>

               <h2 className="mt-4 font-serif text-2xl font-bold text-ink">
                  Your wishlist is empty
               </h2>

               <p className="mt-2 text-sm text-ink/60">
                  Discover your favourite products and save them for later.
               </p>

               <Link
                  to="/shop"
                  className="mt-6 inline-flex rounded-xl bg-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-leaf"
               >
                  Explore Products
               </Link>
            </div>
         ) : (
            /* Wishlist Products */
            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
               {items.map((item) => (
                  <article
                     key={item.id}
                     className="group overflow-hidden rounded-2xl border border-[#eee9dc] bg-[#fffdf8] p-2 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                     <div className="relative overflow-hidden rounded-xl bg-sand">
                        <Link to="/product">
                           <img
                              src={item.image}
                              alt={item.name}
                              loading="lazy"
                              className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
                           />
                        </Link>

                        <button
                           type="button"
                           onClick={() => removeItem(item.id)}
                           aria-label={`Remove ${ item.name } from wishlist`}
                           className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#fffdf8]/95 text-xl text-forest shadow-sm transition hover:text-red-700"
                        >
                           ×
                        </button>
                     </div>

                     <div className="p-2">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-forest/70">
                           {item.category}
                        </p>

                        <Link
                           to="/product"
                           className="mt-1 block text-sm font-semibold text-ink hover:text-forest"
                        >
                           {item.name}
                        </Link>

                        <p className="mt-1 text-xs text-ink/55">
                           {item.weight}
                        </p>

                        <div className="mt-3 flex items-center justify-between gap-2">
                           <span className="font-serif text-lg font-bold text-forest">
                              ₹{item.price}
                           </span>

                           <button
                              type="button"
                              onClick={() => addToCart(item)}
                              className="rounded-lg bg-forest px-3 py-2 text-[11px] font-semibold text-white transition hover:bg-leaf"
                           >
                              Add to Cart
                           </button>
                        </div>
                     </div>
                  </article>
               ))}
            </div>
         )}

         <p className="mt-5 text-xs leading-5 text-ink/45">
            Wishlist currently uses sample data. Connect it to your user
            context or backend to save items between visits.
         </p>
      </section>
   );
};

export default Wishlist;