import { Link } from "react-router-dom";
const Login = () => {
   return (
      <main className="min-h-screen bg-[#F5F6F1] text-[#26352B] flex items-center justify-center px-4 py-10">
         <section className="w-full max-w-md rounded-3xl border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
            <Link to="/admin" className="block text-center font-serif text-3xl font-bold tracking-tight text-[#1F3827]">
               <img className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E6EEDB] text-3xl p-1" src="../../images/logobadge.png"></img>
            </Link>
            <p className="mt-2 text-center text-xs font-semibold uppercase tracking-[.22em] text-stone-400">
               Store administration
            </p>

            <div className="mt-9 text-center">
               <h1 className="font-serif text-2xl font-bold">Welcome back</h1>
               <p className="mt-2 text-sm text-stone-500">Sign in to manage your store.</p>
            </div>

            <form className="mt-7 space-y-5" onSubmit={(event) => event.preventDefault()}>
               <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-stone-700">Email address</label>
                  <input
                     id="email"
                     name="email"
                     type="email"
                     autoComplete="username"
                     placeholder="admin@example.com"
                     required
                     className="w-full rounded-xl border border-stone-200 bg-[#FCFCFA] px-4 py-3 text-sm outline-none transition focus:border-[#78965B] focus:ring-2 focus:ring-[#DCE9C9]"
                  />
               </div>

               <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                     <label htmlFor="password" className="block text-sm font-semibold text-stone-700">Password</label>
                     <a href="#" className="text-xs font-semibold text-[#557640] hover:underline">Forgot password?</a>
                  </div>
                  <input
                     id="password"
                     name="password"
                     type="password"
                     autoComplete="current-password"
                     placeholder="Enter your password"
                     required
                     className="w-full rounded-xl border border-stone-200 bg-[#FCFCFA] px-4 py-3 text-sm outline-none transition focus:border-[#78965B] focus:ring-2 focus:ring-[#DCE9C9]"
                  />
               </div>

               <label className="flex items-center gap-2 text-sm text-stone-600">
                  <input type="checkbox" name="remember" className="h-4 w-4 rounded border-stone-300 accent-[#557640]" />
                  Remember me
               </label>

               <button type="submit" className="w-full rounded-xl bg-[#1F3827] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#2C4B35] focus:outline-none focus:ring-2 focus:ring-[#78965B] focus:ring-offset-2">
                  Sign in to admin
               </button>
            </form>

            <p className="mt-7 text-center text-xs text-stone-400">Authorized administrators only</p>
         </section>
      </main>
   );
}


export default Login;