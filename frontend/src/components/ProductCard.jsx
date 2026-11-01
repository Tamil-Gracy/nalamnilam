import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";


const API = import.meta.env.VITE_API_URL;

const ProductCard = ({ items = products }) => {
   const [products, setProducts] = useState([]);
   const getProducts = async () => {
      const allProducts = await axios.get(`${API}/api/products`);
      setProducts(allProducts.data.data)
   }
   useEffect(() => {
      getProducts();
   }, [])
   return (
      <>
         {items.map((item) => (
            <article key={item.id || item.name} className="group overflow-hidden rounded-2xl border border-[#e7e5d9] bg-white p-2 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg h-fit ">
               <Link to={`/product/${item._id}`} state={{ product: item }} className="relative block overflow-hidden rounded-xl bg-[#f4efdf]">
                  <img src={`${API}${item.image}`} alt={item.name} loading="lazy" className="h-36 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-44" />
                  <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-semibold text-[#174b32]">{item.badge || "Organic collection"}</span>
                  <span className="absolute bottom-2 right-2 rounded-full bg-[#174b32]/90 px-2 py-1 text-[9px] font-medium text-white">{item.category?.name}</span>
               </Link>
               <div className="px-2 pb-2 pt-3">
                  <Link to={`/product/${item._id}`} state={{ product: item }} className="line-clamp-2 text-xs font-semibold leading-5 text-[#142d25] hover:text-[#286642]">{item.name}</Link>
                  <p className="mt-1 text-[10px] text-[#142d25]/55">{item.quantity}{item.unit}</p>
                  <div className="mt-3 flex items-center justify-between gap-2">
                     <p className="text-sm font-bold text-[#174b32]">₹{Number(item.price).toLocaleString("en-IN")}</p>
                     <span className="text-[9px] text-[#286642]">Organic*</span>
                  </div>
                  <Link to={`/product/${item._id}`}>
                  <button className="mt-3 w-full rounded-full bg-[#174b32] px-3 py-2.5 text-[10px] font-semibold text-white transition hover:bg-[#286642] cursor-pointer">View product</button>
                  </Link>
               </div>
            </article>
         ))}
      </>
   )};

export default ProductCard;
