const TopBar = () => {
   return (
      <>
         <header className="flex items-center justify-between border-b border-stone-200 bg-white px-5 py-4 sm:px-8">
            <div>
               <p className="text-xs font-bold uppercase tracking-[.15em] text-stone-400">Store management</p>
               <h1 className="mt-1 text-xl font-bold text-[#1F3827]">Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
               <span className="hidden text-right sm:block">
                  <b className="block text-sm">Store Admin</b>
                  <small className="text-xs text-stone-500">Administrator</small>
               </span>
               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DCE9C9] font-bold text-[#315C3B]">A</div>
            </div>
         </header>
      </>
   )
}

export default TopBar;