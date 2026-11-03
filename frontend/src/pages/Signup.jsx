import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../config/firebase";
import axios from "axios";
import { useUser } from "../context/UserContext";

const API = import.meta.env.VITE_API_URL;

const Signup = () => {
   const navigate = useNavigate();
   const userData = useUser();
   const setUser = userData.setUser;
   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
         if (user) {
            navigate("/profile");
         }
      });

      return () => unsubscribe();
   }, [navigate]);

   const [formData, setFormData] = useState({
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      agree: false,
      role: ""
   });

   const [errMsg, setErrMsg] = useState({});

   // onChange event
   const handleChange = (e) => {
      const { name, type, value, checked } = e.target;
      const fieldValue = type === "checkbox" ? checked : value;

      setFormData((prev) => ({
         ...prev,
         [name]: fieldValue
      }));

      let error = "";

      if (name === "name" && !fieldValue.trim()) {
         error = "Please enter your name";
      } else if (name === "email") {
         if (!fieldValue.trim()) {
            error = "Please enter your email";
         } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValue)) {
            error = "Enter a valid email address";
         }
      } else if (name === "mobile") {
         if (!fieldValue.trim()) {
            error = "Please enter your mobile number";
         } else if (!/^[6-9]\d{9}$/.test(fieldValue)) {
            error = "Enter a valid mobile number";
         }
      } else if (name === "password") {
         if (!fieldValue.trim()) {
            error = "Please enter your password";
         } else if (fieldValue.length < 6) {
            error = "Password must contain at least 6 characters";
         }
      } else if (name === "confirmPassword") {
         if (!fieldValue.trim()) {
            error = "Please re-enter your password";
         } else if (fieldValue !== formData.password) {
            error = "Passwords do not match";
         }
      } else if (name === "agree" && !checked) {
         error = "Please accept the terms and conditions";
      }

      setErrMsg((prev) => ({
         ...prev,
         [name]: error
      }));
   };

   // onSubmit event
   const handleSubmit = async (e) => {
      e.preventDefault();

      const errors = {};

      if (!formData.name.trim()) {
         errors.name = "Please enter your name";
      }

      if (!formData.email.trim()) {
         errors.email = "Please enter your email";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
         errors.email = "Enter a valid email address";
      }

      if (!formData.mobile.trim()) {
         errors.mobile = "Please enter your mobile number";
      } else if (!/^[6-9]\d{9}$/.test(formData.mobile.trim())) {
         errors.mobile = "Enter a valid mobile number";
      }

      if (!formData.password) {
         errors.password = "Please enter your password";
      } else if (formData.password.length < 6) {
         errors.password = "Password must contain at least 6 characters";
      }

      if (!formData.confirmPassword) {
         errors.confirmPassword = "Please re-enter your password";
      } else if (formData.confirmPassword !== formData.password) {
         errors.confirmPassword = "Passwords do not match";
      }

      if (!formData.agree) {
         errors.agree = "Please accept the terms and conditions";
      }

      setErrMsg(errors);

      if (Object.keys(errors).length > 0) {
         return;
      }

      // console.log("1. Checking mobile number...");

      // 1. Check whether mobile number already exists
      const mobileCheck = await axios
         .post(`${API}/api/users/checkMobile`, {
            mobile: formData.mobile.trim()
         })
         .then((res) => {
            //console.log(res);
            return res.data;
         })
         .catch((err) => {
            console.log(err);
            setErrMsg((prev) => ({
               ...prev,
               mobile: err.response?.data?.message
            }));
            return null;
         });

      if (!mobileCheck?.success) {
         return;
      }

      //console.log("2. Creating Firebase account...");

      // 2. Create Firebase account
      const firebaseUser = await createUserWithEmailAndPassword(
         auth,
         formData.email.trim(),
         formData.password
      )
         .then((res) => {
            //console.log(res.user);
            return res;
         })
         .catch((err) => {
            console.log(err);

            if (err.code === "auth/email-already-in-use") {
               setErrMsg((prev) => ({
                  ...prev,
                  email: "This email is already registered."
               }));
            } else {
               setErrMsg((prev) => ({
                  ...prev,
                  email: err.message || "Signup failed."
               }));
            }

            return null;
         });

      if (!firebaseUser) {
         return;
      }

      // console.log("3. Save user profile in MongoDB...");

      // 3. Save user profile in MongoDB
      const mongouserCreated = await axios
         .post(`${API}/api/users`, {
            firebaseUid: firebaseUser.user.uid,
            name: formData.name.trim(),
            email: formData.email.trim(),
            mobile: formData.mobile.trim(),
            role: "user"
         })
         .then((res) => {
            //console.log(res);
            setUser(res.data.data);
            return res.data;
         })
         .catch((err) => {
            console.log(err);
            setUser(null);
            return null;
         });

      if (mongouserCreated?.success) {
         alert("Registered successfully!");
         navigate("/profile");
      }
   };

   return (
      <>
         <div className="mx-auto grid min-h-[calc(100vh-180px)] max-w-7xl items-center gap-10 px-5 py-12 lg:grid-cols-2 lg:px-8">
            {/* Left Image */}
            <div className="hidden lg:block">
               <div className="relative overflow-hidden rounded-[2rem]">
                  <img
                     src="../../images/signupimage.jpeg"
                     alt="Fresh green vegetables"
                     className="h-[650px] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102C1D]/85 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 p-10 text-white">
                     <p className="text-xs font-bold uppercase tracking-[.22em] text-[#DCE9C9]">
                        A healthier way of living begins here
                     </p>
                     <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight">
                        Join the NalamNilam family.
                     </h1>
                     <p className="mt-3 max-w-md text-sm leading-6 text-white/80">
                        Discover thoughtfully sourced organic products that bring nature's goodness closer to your home.
                     </p>
                  </div>
               </div>
            </div>

            {/* Signup Form */}
            <div className="mx-auto w-full max-w-md">
               <div className="rounded-3xl border border-[#E4E5D9] bg-white p-7 shadow-sm sm:p-9">
                  <div className="text-center">
                     <img
                        className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E6EEDB] p-1 text-3xl"
                        src="../../images/logobadge.png"
                     />
                     <h2 className="mt-4 font-serif text-3xl font-semibold text-[#1F3827]">
                        Create your account
                     </h2>
                     <p className="mt-2 text-sm text-stone-500">
                        Fresh food is just a few steps away.
                     </p>
                  </div>

                  <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
                     {/* Full Name */}
                     <label className="block text-xs font-medium text-stone-600">
                        Full name *
                        <input
                           name="name"
                           autoComplete="name"
                           className="mt-2 w-full rounded-xl border border-stone-200 bg-[#FBFAF5] px-4 py-3 text-sm outline-none focus:border-[#66834D]"
                           placeholder="Enter your full name"
                           onChange={handleChange}
                           value={formData.name}
                        />
                        {errMsg.name && (
                           <p className="mt-2 text-[12px] italic text-red-600">
                              {errMsg.name}
                           </p>
                        )}
                     </label>

                     {/* Email */}
                     <label className="block text-xs font-medium text-stone-600">
                        Email address *
                        <input
                           type="email"
                           name="email"
                           autoComplete="email"
                           className="mt-2 w-full rounded-xl border border-stone-200 bg-[#FBFAF5] px-4 py-3 text-sm outline-none focus:border-[#66834D]"
                           placeholder="you@example.com"
                           onChange={handleChange}
                           value={formData.email}
                        />
                        {errMsg.email && (
                           <p className="mt-2 text-[12px] italic text-red-600">
                              {errMsg.email}
                           </p>
                        )}
                     </label>

                     {/* Mobile */}
                     <label className="block text-xs font-medium text-stone-600">
                        Mobile number *
                        <input
                           type="tel"
                           name="mobile"
                           maxLength={10}
                           className="mt-2 w-full rounded-xl border border-stone-200 bg-[#FBFAF5] px-4 py-3 text-sm outline-none focus:border-[#66834D]"
                           placeholder="Enter mobile number"
                           onChange={handleChange}
                           value={formData.mobile}
                        />
                        {errMsg.mobile && (
                           <p className="mt-2 text-[12px] italic text-red-600">
                              {errMsg.mobile}
                           </p>
                        )}
                     </label>

                     {/* Password Fields */}
                     <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block text-xs font-medium text-stone-600">
                           Password *
                           <input
                              id="password"
                              name="password"
                              minLength={6}
                              type="password"
                              autoComplete="new-password"
                              className="mt-2 w-full rounded-xl border border-stone-200 bg-[#FBFAF5] px-4 py-3 text-sm outline-none focus:border-[#66834D]"
                              placeholder="Min. 6 characters"
                              onChange={handleChange}
                              value={formData.password}
                           />
                           {errMsg.password && (
                              <p className="mt-2 text-[12px] italic text-red-600">
                                 {errMsg.password}
                              </p>
                           )}
                        </label>

                        <label className="block text-xs font-medium text-stone-600">
                           Confirm password *
                           <input
                              id="confirm-password"
                              name="confirmPassword"
                              minLength={6}
                              type="password"
                              className="mt-2 w-full rounded-xl border border-stone-200 bg-[#FBFAF5] px-4 py-3 text-sm outline-none focus:border-[#66834D]"
                              placeholder="Re-enter password"
                              onChange={handleChange}
                              value={formData.confirmPassword}
                           />
                           {errMsg.confirmPassword && (
                              <p className="mt-2 text-[12px] italic text-red-600">
                                 {errMsg.confirmPassword}
                              </p>
                           )}
                        </label>
                     </div>

                     {/* Terms and Conditions */}
                     <label className="flex items-start gap-2 text-xs leading-5 text-stone-500">
                        <input
                           type="checkbox"
                           name="agree"
                           className="mt-1 accent-[#24583B]"
                           checked={formData.agree}
                           onChange={handleChange}
                        />
                        I agree to the Terms of Service and Privacy Policy.
                        <br />
                     </label>
                     {errMsg.agree && (
                        <p className="text-[12px] italic text-red-600">
                           {errMsg.agree}
                        </p>
                     )}

                     {/* Submit Button */}
                     <button
                        type="submit"
                        className="w-full cursor-pointer rounded-full bg-[#24583B] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#173D29]"
                     >
                        Create account →
                     </button>
                  </form>

                  <p className="mt-6 text-center text-xs text-stone-500">
                     Already have an account?{" "}
                     <Link to="/login" className="font-semibold text-[#315C3B]">
                        Sign in
                     </Link>
                  </p>
               </div>
            </div>
         </div>
      </>
   );
};

export default Signup;