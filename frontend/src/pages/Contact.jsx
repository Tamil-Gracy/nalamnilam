import { Link } from "react-router-dom";

const Contact = () => {
   return (
      <>
         {/* Contact Hero Section */}
         <section className="bg-[#EAF0E2] px-5 py-14 text-center md:py-16">
            <p className="text-xs font-bold uppercase tracking-[.22em] text-[#66834D]">
               We are here to help
            </p>

            <h1 className="mt-3 font-serif text-4xl font-semibold text-[#1F3827] sm:text-5xl">
               Let’s talk fresh.
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-600">
               Questions about an order, delivery area or product?
               Send us a message and our team will get back to you.
            </p>
         </section>

         {/* Contact Details and Form */}
         <section className="mx-auto grid max-w-7xl gap-8 px-5 py-12 lg:grid-cols-[.8fr_1.2fr] lg:px-8">

            {/* Left Side - Contact Information */}
            <div className="space-y-4">

               {/* Customer Support */}
               <article className="rounded-2xl border border-[#E4E5D9] bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#66834D]">
                     Customer support
                  </p>

                  <h2 className="mt-2 font-serif text-xl font-semibold">
                     How can we help?
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-stone-600">
                     For order questions, keep your order number handy
                     so we can assist you faster.
                  </p>
               </article>

               {/* Email */}
               <article className="rounded-2xl border border-[#E4E5D9] bg-white p-5">
                  <p className="text-lg">
                     ✉️ <strong className="ml-2 text-sm">Email</strong>
                  </p>

                  <p className="mt-2 text-sm text-stone-600">
                     support@nalamnilam.example
                  </p>

               </article>

               {/* Support Hours */}
               <article className="rounded-2xl border border-[#E4E5D9] bg-white p-5">
                  <p className="text-lg">
                     🕒 <strong className="ml-2 text-sm">Support hours</strong>
                  </p>

                  <p className="mt-2 text-sm text-stone-600">
                     Monday–Saturday · 9:00 AM–6:00 PM
                  </p>
               </article>

               {/* Order Help */}
               <article className="rounded-2xl border border-[#E4E5D9] bg-white p-5">
                  <p className="text-lg">
                     📦 <strong className="ml-2 text-sm">Order help</strong>
                  </p>

               </article>

            </div>

            {/* Right Side - Contact Form */}
            <div className="rounded-3xl border border-[#E4E5D9] bg-white p-6 shadow-sm sm:p-8">

               <h2 className="font-serif text-2xl font-semibold text-[#1F3827]">
                  Send us a message
               </h2>

               <p className="mt-2 text-sm text-stone-500">
                  Fields marked * are required.
               </p>

               <form className="mt-6 space-y-4" >

                  {/* Name and Email */}
                  <div className="grid gap-4 sm:grid-cols-2">

                     <label className="block text-xs font-medium text-stone-600">
                        Full name *

                        <input
                           required
                           name="name"
                           className="mt-2 w-full rounded-xl border border-stone-200 bg-[#FBFAF5] px-4 py-3 text-sm outline-none focus:border-[#66834D]"
                           placeholder="Your name"
                        />
                     </label>

                     <label className="block text-xs font-medium text-stone-600">
                        Email address *

                        <input
                           required
                           type="email"
                           name="email"
                           className="mt-2 w-full rounded-xl border border-stone-200 bg-[#FBFAF5] px-4 py-3 text-sm outline-none focus:border-[#66834D]"
                           placeholder="you@example.com"
                        />
                     </label>

                  </div>

                  {/* Subject */}
                  <label className="block text-xs font-medium text-stone-600">
                     Subject

                     <select
                        name="subject"
                        className="mt-2 w-full rounded-xl border border-stone-200 bg-[#FBFAF5] px-4 py-3 text-sm outline-none focus:border-[#66834D]"
                     >
                        <option>Order enquiry</option>
                        <option>Delivery availability</option>
                        <option>Product question</option>
                        <option>Feedback</option>
                        <option>Other</option>
                     </select>
                  </label>

                  {/* Message */}
                  <label className="block text-xs font-medium text-stone-600">
                     Message *

                     <textarea
                        required
                        name="message"
                        rows="5"
                        className="mt-2 w-full rounded-xl border border-stone-200 bg-[#FBFAF5] px-4 py-3 text-sm outline-none focus:border-[#66834D]"
                        placeholder="Tell us how we can help..."
                     />
                  </label>

                  {/* Submit Button */}
                  <button
                     className="w-full rounded-full bg-[#24583B] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#173D29]"
                     type="submit"
                  >
                     Send message →
                  </button>


               </form>
            </div>

         </section>
      </>
   )
}

export default Contact;