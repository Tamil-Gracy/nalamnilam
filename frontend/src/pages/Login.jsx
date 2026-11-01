import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {auth} from "../config/firebase";
import { useUser } from "../context/UserContext";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const Login = () => {
   const navigate = useNavigate();
   useEffect(() => {
      auth.onAuthStateChanged((user) => {
         if (user) {
            navigate("/profile");
         }
      });
   }, [navigate]);
   const userData = useUser();
   const setUser = userData.setUser;

   const [formData, setFormData] = useState({
      email: "",
      password: ""
   });
   const [errMsg, setErrMsg] = useState({});

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

   // Login
   const handleLogin = (e) => {
      e.preventDefault();

      const errors = {};

      if (!formData.email.trim()) {
         errors.email = "Please enter your email";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
         errors.email = "Enter a valid email address";
      }

      if (!formData.password.trim()) {
         errors.password = "Enter your password";
      }

      setErrMsg(errors);

      if (Object.keys(errors).length > 0) {
         return;
      }

         signInWithEmailAndPassword(auth, formData.email, formData.password)
            .then((res) => {
               setUser(res);
               alert("Logged in successfully...");
               navigate("/profile");
               return res;
            })
            .catch((err) => {
               console.log(err);
               setUser(null);
               if (err.code === "auth/invalid-credential") {
                  alert("Failed to login. Please try again...");
               }

               return null;
            });
   };

   // Forgot password
   const handleForgotPassword = async () => {
      const email = formData.email.trim();

      if (!email) {
         setErrMsg({
            email: "Please enter your email address"
         });
         return;
      }

      try {
         await sendPasswordResetEmail(auth, email).then(() => {
            alert("If the account is eligible, check your email for a password reset link.");
         });
      } catch (error) {
         console.error("Password reset error:", error);
         setErrMsg({
            email: "Unable to send the reset email. Please try again."
         });
      }
   };


   //Google login


   const provider = new GoogleAuthProvider();

   const handleGoogleLogin = async () => {
      try {
         const result = await signInWithPopup(auth, provider);
         const firebaseUser = result.user;

         console.log("Google User:", firebaseUser);

         try {
            // Check whether user exists in MongoDB
            const checkUserExists = await axios.get(
               `${API}/api/users/${firebaseUser.uid}`
            );

            if (checkUserExists.data.success) {
               setUser(checkUserExists.data.data);
            }

         } catch (error) {
            if (error.response?.status === 404) {

               // Create new MongoDB user
               const response = await axios.post(`${API}/api/users`, {
                  firebaseUid: firebaseUser.uid,
                  name: firebaseUser.displayName || "",
                  mobile: "",
                  role: "user",
               });

               setUser(response.data.data);

               console.log("New Google user saved:", response.data.data);

            } else {
               throw error;
            }
         }

         alert("Google login successful!");
         navigate("/profile");

      } catch (error) {
         console.error("Google login failed:", error.response?.data || error);

         if (error.code === "auth/popup-closed-by-user") {
            return;
         }

         alert("Google login failed");
      }
   };



   return (
      <>
         <div className="mx-auto grid min-h-[calc(100vh-180px)] max-w-7xl items-center gap-10 px-5 py-12 lg:grid-cols-2 lg:px-8">
            {/* Left image */}
            <div className="hidden lg:block">
               <div className="relative overflow-hidden rounded-[2rem]">
                  <img
                     src="../../images/loginimage.jpeg"
                     alt="Fresh produce at a market"
                     className="h-[620px] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102C1D]/85 via-[#102C1D]/10 to-transparent" />
                  <div className="absolute bottom-0 p-10 text-white">
                     <p className="text-xs font-bold uppercase tracking-[.22em] text-[#DCE9C9]">
                        Welcome back
                     </p>
                     <h1 className="mt-3 max-w-lg font-serif text-4xl font-semibold leading-tight">
                        Nature's Best for Your Family
                     </h1>
                     <p className="mt-3 max-w-md text-sm leading-6 text-white/80">
                        Sign in to revisit your basket and keep track of your orders.
                     </p>
                  </div>
               </div>
            </div>

            {/* Right form */}
            <div className="mx-auto w-full max-w-md">
               <div className="rounded-3xl border border-[#E4E5D9] bg-white p-7 shadow-sm sm:p-9">
                  <div className="text-center">
                     <img
                        className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E6EEDB] p-1 text-3xl"
                        src="../../images/logobadge.png"
                     />
                     <h2 className="mt-4 font-serif text-3xl font-semibold text-[#1F3827]">
                        Welcome back
                     </h2>
                     <p className="mt-2 text-sm text-stone-500">
                        Sign in to your NalamNilam account
                     </p>
                  </div>

                  <form className="mt-7 space-y-4" onSubmit={handleLogin}>
                     <label className="block text-xs font-medium text-stone-600">
                        Email
                        <input
                           name="email"
                           className="mt-2 w-full rounded-xl border border-stone-200 bg-[#FBFAF5] px-4 py-3 text-sm outline-none focus:border-[#66834D]"
                           placeholder="Enter your email"
                           value={formData.email}
                           onChange={handleChange}
                        />
                        {errMsg.email && (
                           <p className="mt-2 text-[12px] italic text-red-600">
                              {errMsg.email}
                           </p>
                        )}
                     </label>

                     <div className="mb-2 flex items-center justify-between gap-3">
                        <label
                           htmlFor="password"
                           className="block text-sm font-semibold text-stone-700"
                        >
                           Password
                        </label>
                        <a
                           onClick={handleForgotPassword}
                           className="cursor-pointer text-xs font-semibold text-[#557640] hover:underline"
                        >
                           Forgot password?
                        </a>
                     </div>

                     <input
                        type="password"
                        name="password"
                        id="password"
                        className="mt-2 w-full rounded-xl border border-stone-200 bg-[#FBFAF5] px-4 py-3 text-sm outline-none focus:border-[#66834D]"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                     />

                     {errMsg.password && (
                        <p className="mt-2 text-[12px] italic text-red-600">
                           {errMsg.password}
                        </p>
                     )}

                     <button
                        type="submit"
                        className="w-full cursor-pointer rounded-full bg-[#24583B] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#173D29]"
                     >
                        Sign in →
                     </button>
                  </form>

                  <div className="mt-6">
                     <div className="flex items-center gap-3 mb-5">
                        <div className="h-px flex-1 bg-gray-200"></div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider">
                           Or continue with
                        </span>
                        <div className="h-px flex-1 bg-gray-200"></div>
                     </div>

                     <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-3
      bg-white border border-[#d5dfd5] rounded-xl
      px-5 py-3 text-[#263b2d] font-medium
      hover:bg-[#f2f7ef] hover:border-[#286642]
      transition-all duration-200 cursor-pointer"
                     >
                        <svg viewBox="0 0 24 24" className="w-5 h-5">
                           <path fill="#4285F4" d="M21.35 12.22c0-.68-.06-1.36-.18-2H12v3.79h5.24a4.48 4.48 0 0 1-1.94 2.94v2.46h3.14c1.84-1.69 2.91-4.18 2.91-7.19z" />
                           <path fill="#34A853" d="M12 21.5c2.62 0 4.82-.87 6.43-2.35l-3.14-2.46c-.87.58-1.98.93-3.29.93-2.53 0-4.68-1.71-5.45-4.01H3.31v2.54A9.5 9.5 0 0 0 12 21.5z" />
                           <path fill="#FBBC05" d="M6.55 13.61a5.71 5.71 0 0 1 0-3.22V7.85H3.31a9.5 9.5 0 0 0 0 8.3l3.24-2.54z" />
                           <path fill="#EA4335" d="M12 6.38c1.39 0 2.63.48 3.61 1.41l2.86-2.86A9.15 9.15 0 0 0 12 2.5a9.5 9.5 0 0 0-8.69 5.35l3.24 2.54c.77-2.3 2.92-4.01 5.45-4.01z" />
                        </svg>

                        Continue with Google
                     </button>
                  </div>

                  <div className="my-6 flex items-center gap-3">
                     <span className="h-px flex-1 bg-stone-200" />
                     <span className="text-xs text-stone-400">New to NalamNilam?</span>
                     <span className="h-px flex-1 bg-stone-200" />
                  </div>

                  <Link
                     to="/signup"
                     className="block w-full rounded-full border border-[#315C3B] px-6 py-3 text-center text-sm font-semibold text-[#315C3B] hover:bg-[#EAF0E2]"
                  >
                     Create an account
                  </Link>
               </div>
            </div>
         </div>
      </>
   );
};

export default Login;