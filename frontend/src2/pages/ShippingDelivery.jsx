
import { Link } from "react-router-dom";

function ShippingDelivery() {
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
               Shipping &amp; Delivery
            </h1>
            <p className="mt-3 text-sm leading-7 text-ink/60">
               Fresh produce, delivered from farm to home.
            </p>

            <div className="mt-8 space-y-5 rounded-3xl bg-white p-6 shadow-soft sm:p-8">
               <section>
                  <h2 className="font-serif text-xl font-bold">Delivery Areas</h2>
                  <p className="mt-2 text-sm leading-7 text-ink/65">
                     Delivery is available in selected service areas. Enter your
                     delivery PIN code during checkout to check availability.
                  </p>
               </section>

               <section>
                  <h2 className="font-serif text-xl font-bold">Delivery Slots</h2>
                  <p className="mt-2 text-sm leading-7 text-ink/65">
                     Choose an available delivery slot during checkout. Your selected
                     slot and order confirmation will show the applicable details.
                  </p>
               </section>

               <section>
                  <h2 className="font-serif text-xl font-bold">Delivery Charges</h2>
                  <p className="mt-2 text-sm leading-7 text-ink/65">
                     Applicable delivery charges will be displayed in your order
                     summary before you place your order.
                  </p>
               </section>

               <section>
                  <h2 className="font-serif text-xl font-bold">Order Updates</h2>
                  <p className="mt-2 text-sm leading-7 text-ink/65">
                     Check My Orders in your account for the latest available status
                     of your purchase.
                  </p>
               </section>

               <section>
                  <h2 className="font-serif text-xl font-bold">Delivery Issues</h2>
                  <p className="mt-2 text-sm leading-7 text-ink/65">
                     If your order is delayed or arrives with an issue, contact our
                     customer support team with your order details.
                  </p>
               </section>
            </div>
         </div>
      </main>
   );
}

export default ShippingDelivery;
