import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";

const Analytics = ()=> {
  return (
    <>
    <div className="min-h-screen lg:grid lg:grid-cols-[250px_1fr]">
      <SideBar />
           <div>
              <TopBar />
        <main className="p-5 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-stone-200 bg-white p-5">
              <p className="text-sm text-stone-500">Gross sales</p>
              <p className="mt-2 text-3xl font-bold text-[#1F3827]">₹4.82L</p>
              <p className="mt-2 text-xs text-stone-500">This month · demo</p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-white p-5">
              <p className="text-sm text-stone-500">Orders</p>
              <p className="mt-2 text-3xl font-bold text-[#1F3827]">1,246</p>
              <p className="mt-2 text-xs text-stone-500">This month · demo</p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-white p-5">
              <p className="text-sm text-stone-500">Average order</p>
              <p className="mt-2 text-3xl font-bold text-[#1F3827]">₹387</p>
              <p className="mt-2 text-xs text-stone-500">Per order</p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-white p-5">
              <p className="text-sm text-stone-500">Repeat rate</p>
              <p className="mt-2 text-3xl font-bold text-[#1F3827]">64%</p>
              <p className="mt-2 text-xs text-stone-500">Returning customers</p>
            </div>
          </div>
          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            <section className="rounded-2xl border border-stone-200 bg-white p-6">
              <h2 className="font-bold">Sales overview</h2>
              <p className="mt-1 text-xs text-stone-500">Illustrative weekly figures</p>
              <div className="mt-8 flex h-52 items-end gap-3">
                <div className="flex flex-1 flex-col items-center gap-2">
                  <div className="w-full rounded-t-lg bg-[#66834D] h-[72px]"></div>
                  <span className="text-xs text-stone-500">M</span>
                </div>
                <div className="flex flex-1 flex-col items-center gap-2">
                  <div className="w-full rounded-t-lg bg-[#66834D] h-[105px]"></div>
                  <span className="text-xs text-stone-500">T</span>
                </div>
                <div className="flex flex-1 flex-col items-center gap-2">
                  <div className="w-full rounded-t-lg bg-[#66834D] h-[88px]"></div>
                  <span className="text-xs text-stone-500">W</span>
                </div>
                <div className="flex flex-1 flex-col items-center gap-2">
                  <div className="w-full rounded-t-lg bg-[#66834D] h-[130px]"></div>
                  <span className="text-xs text-stone-500">T</span>
                </div>
                <div className="flex flex-1 flex-col items-center gap-2">
                  <div className="w-full rounded-t-lg bg-[#66834D] h-[115px]"></div>
                  <span className="text-xs text-stone-500">F</span>
                </div>
                <div className="flex flex-1 flex-col items-center gap-2">
                  <div className="w-full rounded-t-lg bg-[#66834D] h-[168px]"></div>
                  <span className="text-xs text-stone-500">S</span>
                </div>
                <div className="flex flex-1 flex-col items-center gap-2">
                  <div className="w-full rounded-t-lg bg-[#66834D] h-[142px]"></div>
                  <span className="text-xs text-stone-500">S</span>
                </div>
              </div>
            </section>
            <section className="rounded-2xl border border-stone-200 bg-white p-6">
              <h2 className="font-bold">Top categories</h2>
              <div className="mt-6 space-y-5">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Vegetables</span>
                    <b>48%</b>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-stone-100">
                    <div className="h-2 rounded-full bg-[#315C3B] w-[48%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Fruits</span>
                    <b>32%</b>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-stone-100">
                    <div className="h-2 rounded-full bg-[#315C3B] w-[32%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Millets</span>
                    <b>20%</b>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-stone-100">
                    <div className="h-2 rounded-full bg-[#315C3B] w-[20%]"></div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <p className="mt-5 text-xs text-stone-500">All metrics and charts are sample UI values. Connect verified order and payment records for real reporting.</p>
        </main>
      </div>
    </div>
    </>
  );
}

export default Analytics;
