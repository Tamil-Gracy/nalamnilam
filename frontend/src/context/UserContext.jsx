import { createContext, useContext, useEffect, useState } from "react";
import {auth} from "../config/firebase";
import axios from "axios";


const UserContext = createContext();

const API = import.meta.env.VITE_API_URL;

const UserProvider = ({ children }) => {
   const [luser, setlUser] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      auth.onAuthStateChanged(async (firebaseUser) => {
         if (firebaseUser) {
            try {
               const res = await axios.get(
                  `${API}/api/users/${firebaseUser.uid}`
               );
              
               setlUser({
                  ...res.data.data,
                  firebaseUid: firebaseUser.uid,
                  email: firebaseUser.email,
               });
            } catch (error) {
               console.error(
                  "Error fetching user:",
                  error.response?.status,
                  error.response?.data || error.message
               );

               setlUser(null);
            }
         }
         setLoading(false);
      });

   }, []);
   
   return (
      <UserContext.Provider value={{ user: luser, setUser: setlUser, loading }}>
         {children}
      </UserContext.Provider>
   );
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
