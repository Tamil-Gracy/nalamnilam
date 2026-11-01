import { Link } from "react-router-dom";

const About = () => {
   return (
      <>
         {/* Hero Section */}
         <section className="relative overflow-hidden bg-[#EAF0E2]">
            <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:py-20 lg:px-8">

               <div>
                  <p className="text-xs font-bold uppercase tracking-[.22em] text-[#66834D]">
                     Our story · Our soil · Our people
                  </p>

                  <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#1F3827] sm:text-5xl">
                     Good food begins{" "}
                     <span className="text-[#66834D]">
                        close to the roots.
                     </span>
                  </h1>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-stone-600">
                     Nalam Nilam brings fresh, seasonal produce closer to your home
                     by connecting local growers with families who care about what
                     they eat.
                  </p>

                  <Link
                     to="/shop"
                     className="mt-7 inline-flex rounded-full bg-[#24583B] px-6 py-3 text-sm font-semibold text-white hover:bg-[#173D29]"
                  >
                     Explore our produce →
                  </Link>
               </div>

               <div className="relative">
                  <img
                     className="h-[340px] w-full rounded-[2rem] object-cover shadow-xl md:h-[440px]"
                     src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=90"
                     alt="Green farmland at sunrise"
                  />

                  {/* <div className="absolute -bottom-5 left-5 rounded-2xl bg-white p-4 shadow-lg">
                     <p className="font-serif text-lg font-semibold text-[#1F3827]">
                        From farm to family
                     </p>
                     <p className="mt-1 text-xs text-stone-500">
                        A little closer to nature, every day.
                     </p>
                  </div> */}
               </div>

            </div>
         </section>

         {/* Our Values Section */}
         <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">

            <div className="mx-auto max-w-2xl text-center">
               <p className="text-xs font-bold uppercase tracking-[.22em] text-[#66834D]">
                  What guides us
               </p>

               <h2 className="mt-3 font-serif text-3xl font-semibold text-[#1F3827] sm:text-4xl">
                  Freshness with a purpose
               </h2>

               <p className="mt-4 text-sm leading-7 text-stone-600">
                  We believe everyday food should be thoughtfully sourced,
                  clearly presented and delivered with care.
               </p>
            </div>

            <div className="mt-9 grid gap-5 md:grid-cols-3">

               {/* Card 1 */}
               <article className="rounded-3xl border border-[#E4E5D9] bg-white p-6">
                  <span className="text-3xl">🌱</span>

                  <h3 className="mt-4 font-serif text-xl font-semibold">
                     Thoughtful sourcing
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-stone-600">
                     We aim to feature seasonal produce from local growers
                     and responsible suppliers.
                  </p>
               </article>

               {/* Card 2 */}
               <article className="rounded-3xl border border-[#E4E5D9] bg-white p-6">
                  <span className="text-3xl">🥬</span>

                  <h3 className="mt-4 font-serif text-xl font-semibold">
                     Everyday freshness
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-stone-600">
                     A simple way to shop vegetables, fruits and wholesome
                     millets for your kitchen.
                  </p>
               </article>

               {/* Card 3 */}
               <article className="rounded-3xl border border-[#E4E5D9] bg-white p-6">
                  <span className="text-3xl">🤝</span>

                  <h3 className="mt-4 font-serif text-xl font-semibold">
                     Local connection
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-stone-600">
                     We want to make it easier for customers to support
                     farming communities.
                  </p>
               </article>

            </div>
         </section>

         {/* Call to Action Section */}
         <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-5 rounded-3xl bg-[#1F4B35] p-8 text-white md:flex-row md:items-center md:p-10">

               <div>
                  <h2 className="font-serif text-3xl font-semibold">
                     Bring a little goodness home.
                  </h2>

                  <p className="mt-2 text-sm text-white/75">
                     Explore fresh picks for your everyday table.
                  </p>
               </div>

               <Link
                  to="/shop"
                  className="rounded-full bg-[#F8F6EB] px-6 py-3 text-sm font-semibold text-[#1F4B35]"
               >
                  Shop fresh produce →
               </Link>

            </div>
         </section>
      </>
   )
}

export default About;