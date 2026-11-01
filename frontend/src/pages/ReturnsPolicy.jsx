
import { Link } from "react-router-dom";

function ReturnsPolicy() {
   return (
      <main className="min-h-screen bg-cream px-5 py-12 text-ink">
         <div className="mx-auto max-w-3xl">
            <Link to="/" className="text-sm text-forest hover:underline">
               ← Back to Home
            </Link>

            <p className="mt-8 text-xs font-bold tracking-widest text-forest">
               CUSTOMER CARE
            </p>
            <h1 className="mt-3 font-serif text-4xl font-bold">
               Returns &amp; Refunds Policy
            </h1>
            <p className="mt-3 text-sm leading-7 text-ink/60">
               Our approach to product quality and order issues.
            </p>

            <div className="mt-8 space-y-5 rounded-3xl bg-white p-6 shadow-soft sm:p-8">
               <section>
                  <h2 className="font-serif text-xl font-bold">Fresh Produce</h2>
                  <p className="mt-2 text-sm leading-7 text-ink/65">
                     As fresh produce is perishable, returns may be limited. Please
                     inspect your order upon delivery and report any quality issues
                     promptly.
                  </p>
               </section>

               <section>
                  <h2 className="font-serif text-xl font-bold">Damaged or Incorrect Items</h2>
                  <p className="mt-2 text-sm leading-7 text-ink/65">
                     If you receive a damaged, spoiled or incorrect item, contact
                     customer support with your order number and clear photographs
                     where possible.
                  </p>
               </section>

               <section>
                  <h2 className="font-serif text-xl font-bold">Refund Requests</h2>
                  <p className="mt-2 text-sm leading-7 text-ink/65">
                     Refund requests will be reviewed based on the issue reported and
                     the applicable policy. If approved, the refund process and
                     expected timeline will be communicated to you.
                  </p>
               </section>

               <section>
                  <h2 className="font-serif text-xl font-bold">Cancellations</h2>
                  <p className="mt-2 text-sm leading-7 text-ink/65">
                     Cancellation availability may depend on the current status of
                     your order. Contact customer support as soon as possible to
                     request a cancellation.
                  </p>
               </section>

               <section>
                  <h2 className="font-serif text-xl font-bold">Need Help?</h2>
                  <p className="mt-2 text-sm leading-7 text-ink/65">
                     Keep your order confirmation and contact our customer support
                     team for assistance with returns or refunds.
                  </p>
               </section>
            </div>
         </div>
      </main>
   );
}

export default ReturnsPolicy;
