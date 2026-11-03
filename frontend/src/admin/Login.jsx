import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
   signInWithEmailAndPassword, sendPasswordResetEmail, setPersistence,
   browserSessionPersistence, } from "firebase/auth";
import { adminAuth } from "../config/firebase";

const API = import.meta.env.VITE_API_URL;

const Login = () => {

   const navigate = useNavigate();
   const [formData, setFormData] = useState({
      email: "",
      password: ""
   });
   const [errMsg, setErrMsg] = useState({});

   //for popup msg
   const [popup, setPopup] = useState("");
   const [message, setMessage] = useState("");
   const [messageType, setMessageType] = useState("success");


   // Show success or error popup
   const showMessage = (type, text) => {
      setMessageType(type);
      setMessage(text);
   };

   // Close popup
   const closePopup = () => {
      setPopup("");
   };


   const handleChange = (e) => {
      setFormData((prev => ({
         ...prev,
         [e.target.name]: e.target.value
      })))
      if (e.target.name === "email") {
         if (!e.target.value.trim()) {
            setErrMsg((prev) => ({
               ...prev,
               email: "Please enter your email"
           }))
         } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
            setErrMsg((prev) => ({
               ...prev,
               email: "Enter a valid email address"
            }))
         } else {
            setErrMsg((prev) => ({
               ...prev,
               email: ""
            }))
         }
      }
      if (e.target.name === "password" && !e.target.value.trim()) {
         setErrMsg((prev) => ({
            ...prev,
            password: "Enter your password"
         }))
      } else {
         setErrMsg((prev) => ({
            ...prev,
            password: ""
         }))
      }
   }

   const handleLogin = async (e) => {
      e.preventDefault();
      const errors = {};

      if (!formData.email.trim()) {
         errors.email = "Please enter your email";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
         errors.email = "Enter a valid email address";
      }

      if (!formData.password.trim()) {
         errors.password = "Please enter your password";
      }

      setErrMsg(errors);

      if (Object.keys(errors).length > 0) {
         return;
      }

      await setPersistence(adminAuth, browserSessionPersistence);

      await signInWithEmailAndPassword(adminAuth, formData.email, formData.password)
         .then((res) => {
            setPopup("message")
            showMessage(
               "success",
               "Admin Logged in successfully..."
            );
            setTimeout(() => {
               navigate("/admin/dashboard");
            }, 2000);
            return res;
         })
         .catch((err) => {
            console.log(err)
            if (err) {
               setPopup("message")
               showMessage(
                  "error",
                  "Failed to login. Please try again..."
               );
            }

            return null;
         });

   }

   // Forgot password
   const handleForgotPassword = async () => {
      const email = formData.email.trim();

      if (!email) {
         setErrMsg({
            email: "Please enter your email address"
         });
         return;
      }
      if (email !== "admin@gmail.com") {
         setErrMsg({
            email: "Please enter correct email address"
         });
         return;
      }
      try {
         await sendPasswordResetEmail(adminAuth, email).then(() => {
            alert("If the account is eligible, check your email for a password reset link.");
         });
      } catch (error) {
         console.error("Password reset error:", error);
         setErrMsg({
            email: "Unable to send the reset email. Please try again."
         });
      }
   };


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

            <form className="mt-7 space-y-5" onSubmit={handleLogin}>
               <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-stone-700">Email address</label>
                  <input
                     id="email"
                     name="email"
                     type="email"
                     autoComplete="username"
                     placeholder="Enter yout email address"
                     className="w-full rounded-xl border border-stone-200 bg-[#FCFCFA] px-4 py-3 text-sm outline-none transition focus:border-[#78965B] focus:ring-2 focus:ring-[#DCE9C9]"
                     value={formData.email}
                     onChange={handleChange}
                  />
                  {errMsg.email && (
                     <p className="mt-2 text-[12px] italic text-red-600">
                        {errMsg.email}
                     </p>
                  )}
               </div>

               <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                     <label htmlFor="password" className="block text-sm font-semibold text-stone-700">Password</label>
                     <a onClick={handleForgotPassword} className="text-xs font-semibold text-[#557640] hover:underline cursor-pointer">Forgot password?</a>
                  </div>
                  <input
                     id="password"
                     name="password"
                     type="password"
                     autoComplete="current-password"
                     placeholder="Enter your password"
                     className="w-full rounded-xl border border-stone-200 bg-[#FCFCFA] px-4 py-3 text-sm outline-none transition focus:border-[#78965B] focus:ring-2 focus:ring-[#DCE9C9]"
                     value={formData.password}
                     onChange={handleChange}
                  />
                  {errMsg.password && (
                     <p className="mt-2 text-[12px] italic text-red-600">
                        {errMsg.password}
                     </p>
                  )}
               </div>
               {/* 
               <label className="flex items-center gap-2 text-sm text-stone-600">
                  <input type="checkbox" name="remember" className="h-4 w-4 rounded border-stone-300 accent-[#557640]" />
                  Remember me
               </label> */}

               <button type="submit" className="w-full rounded-xl bg-[#1F3827] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#2C4B35] focus:outline-none focus:ring-2 focus:ring-[#78965B] focus:ring-offset-2 cursor-pointer">
                  Sign in to admin
               </button>
            </form>

         </section>
         {/* Success and Error Popup */}
         {popup=='message' && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 p-4">
               <div className="w-full max-w-sm rounded-2xl bg-[#FBF8EF] p-6 text-center shadow-xl">
                  <div
                     className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-2xl font-bold ${messageType === "success"
                        ? "bg-green-100 text-[#315C3B]"
                        : "bg-red-100 text-red-600"
                        }`}
                  >
                     {messageType === "success" ? "✓" : "!"}
                  </div>

                  <h2
                     className={`text-xl font-bold ${messageType === "success"
                        ? "text-[#174B32]"
                        : "text-red-600"
                        }`}
                  >
                     {messageType === "success" ? "Success!" : "Error!"}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-stone-600">
                     {message}
                  </p>

                  <button
                     type="button"
                     onClick={closePopup}
                     className="mt-6 w-full rounded-xl bg-[#315C3B] px-5 py-3 text-sm font-semibold text-white hover:bg-[#26492E] cursor-pointer"
                  >
                     OK
                  </button>
               </div>
            </div>
         )}
      </main>
   );
}


export default Login;