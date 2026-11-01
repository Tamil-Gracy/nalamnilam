import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { adminAuth } from "../../config/firebase";

const ADMIN_UID = "3zd5MGvKTHaauNrFTVH2IbTxjI23";

function AdminProtectedRoute() {
   const [admin, setAdmin] = useState(undefined);

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(adminAuth, (user) => {
         if (user && user.uid === ADMIN_UID) {
            setAdmin(user);
         } else {
            setAdmin(null);
         }
      });

      return () => unsubscribe();
   }, []);

   if (admin === undefined) {
      return <p>Checking admin authentication...</p>;
   }

   if (!admin) {
      return <Navigate to="/admin" replace />;
   }

   return <Outlet />;
}

export default AdminProtectedRoute;