import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
   <BrowserRouter>
      <UserProvider>
         <CartProvider>
            <App />
         </CartProvider>
      </UserProvider>
   </BrowserRouter>
);