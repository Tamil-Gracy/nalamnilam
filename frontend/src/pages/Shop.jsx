import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";

const API = import.meta.env.VITE_API_URL;

const Shop = () => {

   const [products, setProducts] = useState([]);
   const [categories, setCategories] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchProducts = async () => {
         try {
            const response = await axios.get(`${API}/api/products`);
            const catresponse = await axios.get(`${API}/api/categories`);
            setProducts(response.data.data || []);
            setCategories(catresponse.data.data || []);
         } catch (error) {
            console.error("Failed to fetch data:", error);
         } finally {
            setLoading(false);
         }
      };

      fetchProducts();
   }, []);





   // search
   const [searchTerm, setSearchTerm] = useState("");

   //category filter
   const [selectedCategories, setSelectedCategories] = useState([]);

   //price range
   const [minPrice, setMinPrice] = useState("");
   const [maxPrice, setMaxPrice] = useState("");

   //sort
   const [sortOption, setSortOption] = useState("default");

   const filteredProducts = products.filter((product) => {
      const matchesSearch = product.name
         .toLowerCase()
         .includes(searchTerm.toLowerCase());

      const matchesCategory =
         selectedCategories.length === 0 ||
         selectedCategories.includes(
            product.category?._id || product.category
         );

      const matchesMinPrice =
         minPrice === "" || Number(product.price) >= Number(minPrice);

      const matchesMaxPrice =
         maxPrice === "" || Number(product.price) <= Number(maxPrice);

      return (
         matchesSearch &&
         matchesCategory &&
         matchesMinPrice &&
         matchesMaxPrice
      );
   });
   const sortedProducts = [...filteredProducts].sort((a, b) => {
      switch (sortOption) {
         case "price-low":
            return Number(a.price) - Number(b.price);

         case "price-high":
            return Number(b.price) - Number(a.price);

         case "name-asc":
            return a.name.localeCompare(b.name);

         case "name-desc":
            return b.name.localeCompare(a.name);

         default:
            return 0;
      }
   });






   const filters = (
      <div className="space-y-6">
         {/* Categories */}
         <div>
            <div className="mb-4 flex items-center justify-between">
               <h3 className="text-sm font-bold text-[#174b32]">
                  Categories
               </h3>

               <span className="text-[10px] text-[#286642]/70">
                  {categories.length}
               </span>
            </div>

            <div className="space-y-4">
               {/* All products */}
               <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-[#eaf1df] px-3 py-3">
                  <input
                     type="checkbox"
                     className="h-4 w-4 cursor-pointer accent-[#174b32]"
                     checked={
                        categories.length > 0 &&
                        selectedCategories.length === categories.length
                     }
                     onChange={(e) => {
                        setSelectedCategories(
                           e.target.checked ? categories.map((category) => category._id) : []
                        );
                     }}
                  />

                  <span className="text-xs font-semibold text-[#174b32]">
                     All products
                  </span>
               </label>

               {/* Category checkboxes */}
               {categories.map((category) => (
                  <div
                     key={category.name}
                     className="rounded-xl border border-[#e7e5d9] bg-white p-3"
                  >
                     <label className="flex cursor-pointer items-center gap-3">
                        <input
                           type="checkbox"
                           className="h-4 w-4 cursor-pointer accent-[#174b32]"
                           checked={selectedCategories.includes(category._id)}
                           onChange={(e) => {
                              if (e.target.checked) {
                                 setSelectedCategories((previous) => [
                                    ...previous,
                                    category._id,
                                 ]);
                              } else {
                                 setSelectedCategories((previous) =>
                                    previous.filter((id) => id !== category._id)
                                 );
                              }
                           }}
                        />

                        <span className="text-xs font-semibold text-[#174b32]">
                           {category.name}
                        </span>
                     </label>

                     {/* Subcategory checkboxes
                     <div className="ml-2 mt-3 space-y-3 border-l border-[#dce5d4] pl-5">
                        {category.subcategories.map((sub) => (
                           <label
                              key={sub}
                              className="flex cursor-pointer items-center gap-2"
                           >
                              <input
                                 type="checkbox"
                                 className="h-3.5 w-3.5 cursor-pointer accent-[#286642]"
                              />

                              <span className="text-xs text-[#142d25]/70">
                                 {sub}
                              </span>
                           </label>
                        ))}
                     </div>--> */}
                  </div>
               ))}
            </div>
         </div>

         {/* Price range */}
         <div className="border-t border-[#e7e5d9] pt-5">
            <h3 className="mb-3 text-sm font-bold text-[#174b32]">
               Price range
            </h3>

            <div className="grid grid-cols-2 gap-2">
               <label className="text-[10px] text-[#142d25]/60">
                  Min price (₹)
                  <input
                     type="number"
                     min="0"
                     placeholder="0"
                     className="mt-1 w-full rounded-xl border border-[#e7e5d9] bg-white px-3 py-2.5 text-xs outline-none focus:border-[#286642]"
                     value={minPrice}
                     onChange={(e) => setMinPrice(e.target.value)}
                  />
               </label>

               <label className="text-[10px] text-[#142d25]/60">
                  Max price (₹)
                  <input
                     type="number"
                     min="0"
                     placeholder="500"
                     className="mt-1 w-full rounded-xl border border-[#e7e5d9] bg-white px-3 py-2.5 text-xs outline-none focus:border-[#286642]"
                     value={maxPrice}
                     onChange={(e) => setMaxPrice(e.target.value)}
                  />
               </label>
            </div>
         </div>

         <button
            type="button"
            className="w-full cursor-pointer rounded-full border border-[#174b32] px-4 py-2.5 text-xs font-semibold text-[#174b32] hover:bg-[#eaf1df]"
            onClick={() => {
               setSearchTerm("");
               setSelectedCategories([]);
               setMinPrice("");
               setMaxPrice("");
               setSortOption("default");
            }}
         >
            Clear all filters
         </button>
      </div>
   );

   return (
      <section className="mx-auto max-w-7xl px-4 py-7 sm:px-5 sm:py-10">
         {/* Hero section */}
         <div className="relative overflow-hidden rounded-3xl bg-[#eaf1df] px-6 py-9 md:px-12 md:py-12">
            <div className="max-w-2xl md:max-w-[60%]">
               <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#286642]">
                  The NalamNilam organic collection
               </p>

               <h1 className="mt-3 font-serif text-3xl font-bold text-[#174b32] md:text-5xl">
                  Naturally good essentials.
               </h1>

               <p className="mt-4 max-w-xl text-sm leading-7 text-[#142d25]/70">
                  Explore millets, traditional rice, pulses, oils,
                  spices and seasonal produce. Shop thoughtfully
                  sourced products in one place.
               </p>

               <div className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-[10px] text-[#174b32]">
                  🌱 Certification details should be verified for each product
               </div>
            </div>

            <img
               src="../../images/signupimage.jpeg"
               alt="Organic farm products"
               className="mt-7 h-40 w-full rounded-2xl object-cover sm:h-48 md:absolute md:right-8 md:top-8 md:mt-0 md:h-[calc(100%-4rem)] md:w-[34%]"
            />
         </div>

         {/* Category cards */}
         <div className="mt-10">
            <div className="mb-5 flex items-end justify-between gap-3">
               <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#286642]">
                     Browse naturally
                  </p>

                  <h2 className="mt-2 font-serif text-2xl font-bold text-[#174b32]">
                     Shop by category
                  </h2>
               </div>

               <Link
                  to="/contact"
                  className="text-xs text-[#174b32] underline"
               >
                  Sourcing questions?
               </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
               <CategoryCard />
            </div>
         </div>

         {/* Products section */}
         <div className="mt-12">
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
               <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#286642]">
                     Thoughtfully selected
                  </p>

                  <h2 className="mt-2 font-serif text-2xl font-bold text-[#174b32]">
                     Explore our collection
                  </h2>

                  <p className="mt-2 text-xs text-[#142d25]/60">
                     Find products by category, price or name.
                  </p>
               </div>

               <div className="flex flex-col gap-2 sm:flex-row">
                  {/* Search input */}
                  <label className="relative">
                     <span className="sr-only">
                        Search products
                     </span>

                     <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#286642]">
                        ⌕
                     </span>

                     <input
                        type="text"
                        placeholder="Search organic products"
                        className="w-full rounded-full border border-[#e7e5d9] bg-white py-3 pl-9 pr-4 text-xs outline-none focus:border-[#286642] sm:w-56"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                     />
                  </label>

                  {/* Mobile filters button - UI only */}
                  <button
                     type="button"
                     className="rounded-full border border-[#174b32] px-4 py-3 text-xs font-semibold text-[#174b32] sm:hidden"
                  >
                     Filters & price
                  </button>

                  {/* Sort dropdown */}
                  <label className="flex items-center gap-2 rounded-full border border-[#e7e5d9] bg-white px-4 py-2 text-xs text-[#142d25]/70">
                     <span className="whitespace-nowrap">
                        Sort by
                     </span>

                     <select
                        className="max-w-[165px] bg-transparent py-1 font-semibold text-[#174b32] outline-none"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                     >
                        <option value="default">Featured</option>
                        <option value="price-low">
                           Price: low to high
                        </option>
                        <option value="price-high">
                           Price: high to low
                        </option>
                        <option value="name-asc">Name: A to Z</option>
                        <option value="name-desc">Name: Z to A</option>
                     </select>
                  </label>
               </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
               {/* Desktop filters */}
               <aside className="hidden self-start rounded-2xl border border-[#e7e5d9] bg-[#fffdf8] p-4 lg:sticky lg:top-24 lg:block">
                  {filters}
               </aside>

               {/* Product list placeholder */}
               {loading ? (
                  <div>
                     <div className="mb-4 flex items-center justify-between">
                        <p className="text-xs text-[#142d25]/60">
                           Products will appear here
                        </p>
                     </div>

                     <div className="rounded-2xl border border-dashed border-[#cbd8c1] bg-[#fffdf8] px-5 py-16 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#eaf1df] text-2xl">
                           🌿
                        </div>

                        <h3 className="font-serif text-xl font-bold text-[#174b32]">
                           Our Organic Collection
                        </h3>

                        <p className="mx-auto mt-3 max-w-sm text-xs leading-6 text-[#142d25]/60">
                           Loading
                        </p>
                     </div>
                  </div>
               ) : products.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                        <ProductCard items={sortedProducts} />
                  </div>
               ) : (
                  <p className="py-10 text-center">No products found.</p>
               )}
            </div>
         </div>
      </section>
   );
};

export default Shop;
