
import { Link } from "react-router-dom";

function TermsConditions() {
   return (
      <main className="min-h-screen bg-cream px-5 py-12 text-ink">
         <div className="mx-auto max-w-3xl">
            <Link to="/" className="text-sm text-forest hover:underline">
               ← Back to Home
            </Link>

            <p className="mt-8 text-xs font-bold tracking-widest text-forest">
               LEGAL INFORMATION
            </p>
            <h1 className="mt-3 font-serif text-4xl font-bold">
               Terms &amp; Conditions
            </h1>
            <p className="mt-3 text-sm leading-7 text-ink/60">
               Please read these terms before using Nalam Nilam.
            </p>

            <div className="mt-8 space-y-5 rounded-3xl bg-white p-6 shadow-soft sm:p-8">
               <section>
                  <h2 className="font-serif text-xl font-bold">1. Using Our Website</h2>
                  <p className="mt-2 text-sm leading-7 text-ink/65">
                     By accessing this website, you agree to use it lawfully and
                     provide accurate information when placing an order.
                  </p>
               </section>

               <section>
                  <h2 className="font-serif text-xl font-bold">2. Products &amp; Availability</h2>
                  <p className="mt-2 text-sm leading-7 text-ink/65">
                     Product availability, appearance, size and prices may change
                     according to season, harvest and stock. Product images are
                     illustrative and may differ slightly from delivered items.
                  </p>
               </section>

               <section>
                  <h2 className="font-serif text-xl font-bold">3. Orders &amp; Payments</h2>
                  <p className="mt-2 text-sm leading-7 text-ink/65">
                     Orders are subject to product availability and confirmation.
                     The applicable prices, delivery charges and payment options will
                     be shown during checkout.
                  </p>
               </section>

               <section>
                  <h2 className="font-serif text-xl font-bold">4. Delivery</h2>
                  <p className="mt-2 text-sm leading-7 text-ink/65">
                     Delivery depends on your location, selected time slot and
                     product availability. Unforeseen circumstances may affect
                     delivery schedules.
                  </p>
               </section>

               <section>
                  <h2 className="font-serif text-xl font-bold">5. Returns &amp; Refunds</h2>
                  <p className="mt-2 text-sm leading-7 text-ink/65">
                     Requests involving damaged, spoiled or incorrect products are
                     handled according to our Returns &amp; Refunds Policy.
                  </p>
               </section>

               <section>
                  <h2 className="font-serif text-xl font-bold">6. Website Content</h2>
                  <p className="mt-2 text-sm leading-7 text-ink/65">
                     Website content, branding and images should not be copied or
                     reused without appropriate permission.
                  </p>
               </section>

               <section>
                  <h2 className="font-serif text-xl font-bold">7. Changes to These Terms</h2>
                  <p className="mt-2 text-sm leading-7 text-ink/65">
                     These terms may be updated when our services or policies change.
                     Please review this page periodically.
                  </p>
               </section>
            </div>
         </div>
      </main>
   );
}

export default TermsConditions;
