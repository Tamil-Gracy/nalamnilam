import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import axios from "axios";

const UserContext = createContext();

const API = import.meta.env.VITE_API_URL;

const UserProvider = ({ children }) => {
   const [luser, setlUser] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
         setLoading(true);

         if (firebaseUser) {
            console.log("Firebase user logged in:", firebaseUser.uid);

            try {
               const res = await axios.get(
                  `${API}/api/users/${firebaseUser.uid}`
               );
               setlUser(res.data.data);
               // Remaining code
            } catch (error) {
               console.log("MongoDB profile fetch failed:", error.response?.status);
               setlUser(null);
            }
         } else {
            console.log("Firebase user logged out");
            setlUser(null);
         }

         setLoading(false);
      });

      return () => unsubscribe();
   }, []);

   return (
      <UserContext.Provider
         value={{ user: luser, setUser: setlUser, loading }}
      >
         {children}
      </UserContext.Provider>
   );
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };