import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {auth} from "../config/firebase";
import { useUser } from "../context/UserContext";
import { signOut } from 'firebase/auth';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

const Profile = () => {
   const [loading, setLoading] = useState(true);
   const userData = useUser();
   const user = userData.user;
   const setUser = userData.setUser;
   const navigate = useNavigate();
   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
         if (!user) {
            navigate("/login");
         } else {
            setLoading(false);
         }
      });

      return () => unsubscribe();
   }, [navigate]);

   const handleLogout = async () => {
      try {
         await signOut(auth);
         setUser(null);
         alert("Logout successful!");
         console.log('user logged out..')
         navigate("/");
      } catch (error) {
         alert("Logout failed. Please try again.");
         console.log("Logout error:", error);
      }
   };
   

   const [errMsg, setErrMsg] = useState({});
   //update profile
   const [updateProfileFormData, setupdateProfileFormData] = useState({
      name: "",
      mobile: "",
      gender: ""
   });

   useEffect(() => {
      if (user) {
         setupdateProfileFormData({
            name: user?.name || "",
            mobile: user?.mobile || "",
            gender: user?.gender || "",
            email: user?.email || ""
         });
      }
   }, [user]);

   const handleChange = async (e) => {
      setupdateProfileFormData((prev) => ({
         ...prev,
         [e.target.name]: e.target.value
      }))
      if (e.target.name == 'mobile') {

         if (!/^[6-9]\d{9}$/.test(e.target.value)) {
            setErrMsg((prev) => ({
               ...prev,
               mobile: "Enter a valid mobile number"
            }))
         } else if (/^[6-9]\d{9}$/.test(e.target.value)) {
            setErrMsg((prev) => ({
               ...prev,
               mobile: ""
            }))
         }


      }

   }

   const updateProfile = async (e) => {
      e.preventDefault();

      const oldMobile = user.mobile?.trim() || "";
      const newMobile = updateProfileFormData.mobile.trim();

      // Check mobile only if it has changed
      if (oldMobile !== newMobile) {
         try {
            const mobileCheck = await axios.post(
               `${API}/api/users/checkMobile`,
               {
                  mobile: newMobile
               }
            );

            if (!mobileCheck.data.success) {
               setErrMsg((prev) => ({
                  ...prev,
                  mobile: "Mobile number already registered"
               }));
               return;
            }

            setErrMsg((prev) => ({
               ...prev,
               mobile: ""
            }));

         } catch (err) {
            setErrMsg((prev) => ({
               ...prev,
               mobile: err.response?.data?.message || "Mobile check failed"
            }));
            return;
         }
      }

      // Update profile
      try {
         const updateProfileRes = await axios.put(
            `${API}/api/users/${user.firebaseUid}`,
            updateProfileFormData
         );

         setUser(updateProfileRes.data.data);

         alert("Profile updated successfully");

      } catch (err) {
         console.log("Profile update error:", err.response?.data || err.message);
         alert(err.response?.data?.message || "Profile update failed");
      }
   };


   if (loading) {
      return (
         <div className="flex min-h-screen items-center justify-center bg-[#fbf8ef]">
            <p className="text-sm font-medium text-[#174b32]">
               Loading...
            </p>
         </div>
      );
   }

   return (
      <>
         {/* Profile section */}
         {user && (
            <section className="mx-auto max-w-5xl px-5 py-10">

               <p className="text-[10px] font-bold tracking-widest text-forest">
                  WELCOME TO NALAMNILAM
               </p>

               <h1 className="mt-2 font-serif text-4xl font-bold">
                  My Account
               </h1>

               <div className="mt-8 grid gap-6 md:grid-cols-[250px_1fr]">


                  <aside className="rounded-3xl bg-sage p-6">
                     <div className="grid h-14 w-14 place-items-center rounded-full bg-forest font-serif text-xl text-white">
                        <i className="fa-solid fa-user"></i>
                     </div>

                     <h2 className="mt-4 font-serif text-xl font-bold">
                        {user?.name}
                     </h2>

                     <p className="mt-1 text-[10px] text-ink/60">
                        {user?.email}
                     </p>


                     <nav className="mt-6 grid gap-1 overflow-hidden rounded-xl text-xs">

                        {/* My Orders */}
                        <Link
                           to="/orders"
                           className="flex items-center gap-3 border-b border-[#e8e6dc] py-4 font-medium text-forest transition-colors hover:bg-[#eaf1df]"
                        >
                           <i className="fa-solid fa-box w-5 text-center text-base text-[#286642]"></i>
                           <span>My Orders</span>
                           <i className="fa-solid fa-chevron-right ml-auto text-[10px] text-[#286642]"></i>
                        </Link>

                        {/* Account Settings */}
                        <div className="border-b border-[#e8e6dc] py-2">
                           <h3 className="flex items-center gap-3  py-2 font-medium uppercase tracking-wide text-forest">
                              <i className="fa-solid fa-user w-5 text-center text-base text-[#286642]"></i>
                              Account Settings
                           </h3>



                           <Link
                              to="/profile"
                              className="block py-2.5 pl-8 pr-4 text-[#142d25] transition-colors hover:bg-[#eaf1df] hover:text-[#174b32]"
                           >
                              Profile Information
                           </Link>

                           <Link
                              to="/addresses"
                              className="block py-2.5 pl-8 pr-4 text-[#142d25] transition-colors hover:bg-[#eaf1df] hover:text-[#174b32]"
                           >
                              Manage Addresses
                           </Link>
                        </div>

                        {/* Payments */}
                        <div className="border-b border-[#e8e6dc] py-2">
                           <h3 className="flex items-center gap-3  py-2 font-medium uppercase tracking-wide text-forest">
                              <i className="fa-solid fa-wallet w-5 text-center text-base text-[#286642]"></i>
                              Payments
                           </h3>

                           <Link
                              to="/saved-cards"
                              className="block py-2.5 pl-8 pr-4 text-[#142d25] transition-colors hover:bg-[#eaf1df] hover:text-[#174b32]"
                           >
                              Saved Cards
                           </Link>
                        </div>

                        {/* My Stuff */}
                        <div className="border-b border-[#e8e6dc] py-2">
                           <h3 className="flex items-center gap-3  py-2 font-medium uppercase tracking-wide text-forest">
                              <i className="fa-solid fa-folder-open w-5 text-center text-base text-[#286642]"></i>
                              My Stuff
                           </h3>

                           <Link
                              to="/notifications"
                              className="block py-2.5 pl-8 pr-4 text-[#142d25] transition-colors hover:bg-[#eaf1df] hover:text-[#174b32]"
                           >
                              All Notifications
                           </Link>

                           <Link
                              to="/wishlist"
                              className="block py-2.5 pl-8 pr-4 text-[#142d25] transition-colors hover:bg-[#eaf1df] hover:text-[#174b32]"
                           >
                              My Wishlist
                           </Link>

                           <Link
                              to="/cart"
                              className="block py-2.5 pl-8 pr-4 text-[#142d25] transition-colors hover:bg-[#eaf1df] hover:text-[#174b32]"
                           >
                              My Cart
                           </Link>
                        </div>

                        {/* Logout */}
                        <button
                           type="button"
                           onClick={handleLogout}
                           className="flex w-full cursor-pointer items-center gap-3 py-4 font-medium text-red-700 transition-colors hover:bg-red-50"
                        >
                           <i className="fa-solid fa-power-off w-5 text-center text-base"></i>
                           Logout
                        </button>

                     </nav>


                  </aside>


                  <div className="space-y-6">
                     {/* update form */}
                     <section id="personal" className="rounded-3xl bg-white p-6 shadow-soft">
                        <h2 className="font-serif text-2xl font-bold">
                           Personal details
                        </h2>
                        <form onSubmit={updateProfile}>
                           <div className="mt-5 grid gap-4 sm:grid-cols-2 items-baseline">

                              <label className="grid gap-2 text-[11px] font-medium">
                                 Full name
                                 <input
                                    className="rounded-xl border border-forest/15 px-3 py-3 font-normal outline-forest"
                                    type="text"
                                    name="name"
                                    value={updateProfileFormData?.name}
                                    onChange={handleChange}
                                 />
                              </label>

                              {/* <label className="grid gap-2 text-[11px] font-medium">
                                 Email address
                                 <input
                                    className="rounded-xl border border-forest/15 px-3 py-3 font-normal outline-forest"
                                    type="email"
                                    name="email"
                                    value={updateProfileFormData?.email}
                                    readOnly disabled
                                 />
                              </label> */}

                              <label className="grid gap-2 text-[11px] font-medium ">
                                 Phone number
                                 <input
                                    className="rounded-xl border border-forest/15 px-3 py-3 font-normal outline-forest"
                                    type="tel"
                                    name="mobile"
                                    maxLength={10}
                                    value={updateProfileFormData?.mobile}
                                    onChange={handleChange}
                                 />
                                 {errMsg.mobile && (
                                    <span className="mt-2 text-[12px] italic text-red-600">
                                       {errMsg.mobile}
                                    </span>
                                 )}
                              </label>


                              <label className="grid gap-2 text-[11px] font-medium">Gender
                                 <div className="flex items-baseline gap-2">
                                    <label className="flex items-center gap-2 text-[11px] font-normal">
                                       <input
                                          className="accent-forest"
                                          type="radio"
                                          name="gender"
                                          value="male"
                                          checked={updateProfileFormData?.gender === "male"}
                                          onChange={handleChange}
                                       />
                                       Male
                                    </label>

                                    <label className="flex items-center gap-2 text-[11px] font-normal">
                                       <input
                                          className="accent-forest"
                                          type="radio"
                                          name="gender"
                                          value="female"
                                          checked={updateProfileFormData?.gender === "female"}
                                          onChange={handleChange}
                                       />
                                       Female
                                    </label>
                                 </div>
                              </label>

                           </div>

                           <button
                              type="submit"
                              className="mt-5 rounded-full bg-forest px-6 py-3 text-[11px] font-semibold text-white cursor-pointer"

                           >
                              Save details
                           </button>
                        </form>
                     </section>
                  </div>
               </div>
            </section>

         )}
      </>
   )
}

export default Profile;