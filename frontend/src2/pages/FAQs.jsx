
import { Link } from "react-router-dom";

function FAQs() {
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
               Frequently Asked Questions
            </h1>
            <p className="mt-3 text-sm leading-7 text-ink/60">
               Find answers to common questions about shopping with NalamNilam.
            </p>

            <div className="mt-8 space-y-4">
               {[
                  ["What is NalamNilam?", "NalamNilam is a farm-to-home platform offering fresh vegetables, fruits, millets and other everyday essentials."],
                  ["How do I place an order?", "Browse our shop, choose your products, add them to your cart and complete checkout."],
                  ["Are your products fresh?", "We aim to provide fresh produce sourced from local farms, subject to seasonal availability."],
                  ["Can I track my order?", "Visit My Account and open your order details to check the available order status."],
                  ["What payment methods are available?", "Available payment methods are displayed during checkout."],
                  ["How can I contact customer support?", "Please use the contact details provided on our Contact page for assistance."]
               ].map(([question, answer]) => (
                  <div key={question} className="rounded-2xl border border-forest/10 bg-white p-5 shadow-soft">
                     <h2 className="font-semibold">{question}</h2>
                     <p className="mt-2 text-sm leading-6 text-ink/65">{answer}</p>
                  </div>
               ))}
            </div>
         </div>
      </main>
   );
}

export default FAQs;
