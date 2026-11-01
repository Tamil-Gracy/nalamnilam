import { createContext, useContext, useEffect, useState } from "react";
import auth from "../config/firebase";
import axios from "axios";


const UserContext = createContext();

const API = import.meta.env.VITE_API_URL;

const UserProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      auth.onAuthStateChanged(async (firebaseUser) => {
         if (firebaseUser) {
            try {
               const res = await axios.get(
                  `${API}/api/users/${firebaseUser.uid}`
               );
               setUser({ ...res.data.data, email: firebaseUser.email });
            } catch (error) {
               console.log("Error fetching user:", firebaseUser.uid);
               setUser(null);
            }
         }
         setLoading(false);
      });

   }, []);

   return (
      <UserContext.Provider value={{ user, setUser, loading }}>
         {children}
      </UserContext.Provider>
   );
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
