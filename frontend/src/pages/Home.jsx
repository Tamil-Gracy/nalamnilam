import { Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const API = import.meta.env.VITE_API_URL;

const Home = () => {
   const [categories, setCategories] = useState([]);
   const getCategories = async () => {
      const allCategories = await axios.get(`${API}/api/categories`)
      setCategories(allCategories.data.data)
   }
   useEffect(() => {
      getCategories();
   },[])
   //console.log('categories are - ', categories)
   return (
      <main className="bg-[#fbf8ef] text-[#142d25]">
         {/* Hero Section */}
         <section
            className="relative isolate flex min-h-[480px] items-center overflow-hidden  bg-cover bg-center px-6 py-16 sm:min-h-[540px] sm:px-10 lg:min-h-[600px] lg:px-16"
            style={{
               backgroundImage:
                  "url('/images/organic-store-banner.jpg')",
            }}
         >
            {/* Background Overlay */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#142d25]/90 via-[#142d25]/65 to-[#142d25]/20" />

            {/* Hero Content */}
            <div className="max-w-2xl">
               <span className="inline-block rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
                  100% Certified Organic Products
               </span>

               <h1 className="mt-6 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-7xl">
                  Goodness Grown
                  <span className="block text-[#eaf1df]">
                     Naturally.
                  </span>
               </h1>

               <p className="mt-6 max-w-xl text-sm leading-7 text-white/85 sm:text-base">
                  Discover the goodness of nature with our organic
                  millets, rice, pulses, oils, spices, and fresh produce.
                  Bring natural goodness to your everyday meals.
               </p>

               <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                     to="/shop"
                     className="rounded-full bg-[#eaf1df] px-7 py-3.5 text-sm font-semibold text-[#174b32] transition hover:bg-white"
                  >
                     Shop Now
                  </Link>

                  <Link
                     to="/about"
                     className="rounded-full border border-white/70 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                     Our Story
                  </Link>
               </div>

               <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-white/90 sm:text-sm">
                  <span>✓ Carefully sourced products</span>
                  <span>✓ Natural everyday goodness</span>
               </div>
            </div>
         </section>

         {/* Categories Section */}
         <section className="px-4 py-16 sm:px-8 lg:px-12 lg:py-20">
            <div className="mx-auto max-w-7xl">
               <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <div>
                     <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#286642]">
                        Explore our collection
                     </p>

                     <h2 className="mt-3 font-serif text-3xl font-bold text-[#174b32] sm:text-4xl">
                        Shop by Category
                     </h2>

                     <p className="mt-3 max-w-xl text-sm leading-6 text-[#142d25]/70">
                        Explore everyday essentials selected to bring
                        natural goodness to your kitchen.
                     </p>
                  </div>

                  <Link
                     to="/shop"
                     className="text-sm font-semibold text-[#286642] transition hover:text-[#174b32]"
                  >
                     View All Products →
                  </Link>
               </div>

               <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
                  <CategoryCard />
               </div>
            </div>
         </section>

         {/* Why NalamNilam Section */}
         <section className="bg-[#eaf1df] px-4 py-16 sm:px-8 lg:px-12 lg:py-20">
            <div className="mx-auto max-w-7xl">
               <div className="mx-auto mb-12 max-w-2xl text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#286642]">
                     The NalamNilam difference
                  </p>

                  <h2 className="mt-3 font-serif text-3xl font-bold text-[#174b32] sm:text-4xl">
                     Good Choices Begin with Goodness
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-[#142d25]/70">
                     We make it easier to discover organic essentials
                     for your everyday kitchen.
                  </p>
               </div>

               <div className="grid gap-6 md:grid-cols-3">
                  <div className="rounded-3xl bg-[#fbf8ef] p-7 transition hover:-translate-y-1 hover:shadow-lg">
                     <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf1df] text-2xl">
                        <span aria-hidden="true">🌿</span>
                     </div>

                     <h3 className="font-serif text-xl font-bold text-[#174b32]">
                        Certification Transparency
                     </h3>

                     <p className="mt-3 text-sm leading-7 text-[#142d25]/70">
                        Look for clear organic certification and product
                        information to help you make informed choices.
                     </p>
                  </div>

                  <div className="rounded-3xl bg-[#fbf8ef] p-7 transition hover:-translate-y-1 hover:shadow-lg">
                     <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf1df] text-2xl">
                        <span aria-hidden="true">🌾</span>
                     </div>

                     <h3 className="font-serif text-xl font-bold text-[#174b32]">
                        Traditional Goodness
                     </h3>

                     <p className="mt-3 text-sm leading-7 text-[#142d25]/70">
                        Explore millets, rice, pulses, and other familiar
                        essentials for your everyday cooking.
                     </p>
                  </div>

                  <div className="rounded-3xl bg-[#fbf8ef] p-7 transition hover:-translate-y-1 hover:shadow-lg">
                     <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf1df] text-2xl">
                        <span aria-hidden="true">🧺</span>
                     </div>

                     <h3 className="font-serif text-xl font-bold text-[#174b32]">
                        Shop Beyond Your Neighbourhood
                     </h3>

                     <p className="mt-3 text-sm leading-7 text-[#142d25]/70">
                        Order eligible products across India, subject to
                        courier serviceability and product delivery limits.
                     </p>
                  </div>
               </div>
            </div>
         </section>

         {/* Favourite Products Section */}
         <section className="px-4 py-16 sm:px-8 lg:px-12 lg:py-20">
            <div className="mx-auto max-w-7xl">
               <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <div>
                     <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#286642]">
                        Customer favourites
                     </p>

                     <h2 className="mt-3 font-serif text-3xl font-bold text-[#174b32] sm:text-4xl">
                        Everyday Goodness
                     </h2>

                     <p className="mt-3 text-sm leading-6 text-[#142d25]/70">
                        Discover wholesome essentials for your kitchen.
                     </p>
                  </div>

                  <Link
                     to="/shop"
                     className="text-sm font-semibold text-[#286642] transition hover:text-[#174b32]"
                  >
                     Shop All →
                  </Link>
               </div>

               {/* Keep your existing product data and ProductCard mapping here. */}
               <div className="rounded-2xl border border-dashed border-[#286642]/30 bg-white/50 p-8 text-center">
                  <p className="text-sm text-[#142d25]/70">
                     Explore our shop to discover available products.
                  </p>

                  <Link
                     to="/shop"
                     className="mt-4 inline-flex rounded-full bg-[#174b32] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#286642]"
                  >
                     Browse Products
                  </Link>
               </div>
            </div>
         </section>

         {/* NalamNilam Promise Section */}
         <section className="px-4 pb-16 sm:px-8 lg:px-12 lg:pb-20">
            <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-[#174b32] md:grid-cols-2">
               <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#eaf1df]/80">
                     Our promise
                  </p>

                  <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl">
                     Goodness Grown Naturally
                  </h2>

                  <p className="mt-5 text-sm leading-7 text-white/80">
                     At NalamNilam, we believe choosing everyday essentials
                     should feel simple and thoughtful. Explore our range
                     of organic products and find goodness for your home.
                  </p>

                  <div className="mt-8">
                     <Link
                        to="/about"
                        className="inline-flex rounded-full bg-[#eaf1df] px-7 py-3.5 text-sm font-semibold text-[#174b32] transition hover:bg-white"
                     >
                        Discover Our Story
                     </Link>
                  </div>
               </div>

               <div
                  className="min-h-[280px] bg-cover bg-center sm:min-h-[360px]"
                  style={{
                     backgroundImage: "url('/images/millet-banner.jpg')",
                  }}
                  role="img"
                  aria-label="Millets and natural food essentials"
               />
            </div>
         </section>
      </main>
   );
};

export default Home;