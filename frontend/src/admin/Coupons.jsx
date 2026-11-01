import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";

const Coupons = () => {
  return (
    <>
    <div className="min-h-screen lg:grid lg:grid-cols-[250px_1fr]">
   <SideBar />
           <div>
              <TopBar />
        <main className="p-5 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-stone-500">Create and review discount codes.</p>
            <button className="rounded-full bg-[#315C3B] px-5 py-3 text-sm font-bold text-white">＋ Create coupon</button>
          </div>
          <div className="mt-6">
            <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white">
              <table className="w-full min-w-[650px] text-left text-sm">
                <thead className="bg-stone-50 text-xs uppercase tracking-wider text-stone-500">
                  <tr>
                    <th className="px-5 py-4">Code</th>
                    <th className="px-5 py-4">Offer</th>
                    <th className="px-5 py-4">Minimum order</th>
                    <th className="px-5 py-4">Expiry</th>
                    <th className="px-5 py-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-stone-100">
                    <td className="px-5 py-4">FRESH10</td>
                    <td className="px-5 py-4">10% off</td>
                    <td className="px-5 py-4">₹499</td>
                    <td className="px-5 py-4">31 Oct 2026</td>
                    <td className="px-5 py-4">Active</td>
                  </tr>
                  <tr className="border-t border-stone-100">
                    <td className="px-5 py-4">LOCAL50</td>
                    <td className="px-5 py-4">₹50 off</td>
                    <td className="px-5 py-4">₹699</td>
                    <td className="px-5 py-4">30 Nov 2026</td>
                    <td className="px-5 py-4">Active</td>
                  </tr>
                  <tr className="border-t border-stone-100">
                    <td className="px-5 py-4">WELCOME5</td>
                    <td className="px-5 py-4">5% off</td>
                    <td className="px-5 py-4">₹299</td>
                    <td className="px-5 py-4">31 Dec 2026</td>
                    <td className="px-5 py-4">Draft</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-6 rounded-2xl bg-[#DCE9C9] p-5 text-sm leading-6 text-[#315C3B]">
            <b>Validation rule:</b>
            calculate discounts on the server, validate expiry and usage limits, and never trust a discount amount submitted by the browser.
          </div>
        </main>
      </div>
    </div>
    </>
  );
}


export default Coupons;