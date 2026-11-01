import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";

const API = import.meta.env.VITE_API_URL;

const CartContext = createContext();

export const CartProvider = ({ children }) => {
   const navigate = useNavigate();
   const [cartItems, setCartItems] = useState([]);
   const userData = useUser();
   const user = userData.user;

   async function getCartItems() {
      try {
         const res = await axios.get(
            `${API}/api/cart/${user.firebaseUid}`
         );

        // console.log("Cart data:", res.data);

         setCartItems(res.data.data.items);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      if (user?.firebaseUid) {
         getCartItems();
      }
   }, [user?.firebaseUid]);



   const addToCart = async (product) => {
      if (!user?.firebaseUid) {
         navigate("/login");
         return;
      }

      try {
         const res = await axios.post(
            `${API}/api/cart/${user.firebaseUid}`,
            {
               productId: product._id,
            }
         );
         getCartItems();
        // console.log("ssssss", res)
         navigate("/cart");
      } catch (error) {
         console.error(
            "Add to cart failed:",
            error.response?.data || error.message
         );
      }
   };

   //update cart
   const updateQuantity = async (productId, quantity) => {
      if (!user?.firebaseUid || quantity < 1) return;

      try {
         const res = await axios.put(
            `${API}/api/cart/${user.firebaseUid}/${productId}`,
            { quantity }
         );
         getCartItems();

      } catch (error) {
         console.error(
            "Update quantity failed:",
            error.response?.data || error.message
         );
      }
   };

   //remove from cart
   const removeFromCart = async(productId) => {
      if (!user?.firebaseUid) return;

      try {
         const res = await axios.delete(
            `${API}/api/cart/${user.firebaseUid}/${productId}`
         );


         setCartItems(res.data.data.items);
      } catch (error) {
         console.error(
            "Delete failed:",
            error.response?.data || error.message
         );
      }
   };



   return (
      <CartContext.Provider value={{
         cartItems,
         addToCart,
         updateQuantity,
         removeFromCart,
      }}>
         {children}
      </CartContext.Provider>
   );
};

export const useCart = () => useContext(CartContext);