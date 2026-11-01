import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const API = import.meta.env.VITE_API_URL;

const CategoryCard = () => {

   const [categories, setCategories] = useState([]);
   const getCategories = async () => {
      const allCategories = await axios.get(`${API}/api/categories`)
      setCategories(allCategories.data.data)
   }
   useEffect(() => {
      getCategories();
   }, [])



   return (
      <>
         {categories.map((category) => (
            <Link
               key={category._id}
               to={`/category/${category._id}`}
               className="group overflow-hidden rounded-2xl border border-[#e7e5d9] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
               <div className="overflow-hidden bg-[#f4f0e5]">
                  <img
                     src={`${API}${category.image}`}
                     alt={category.name}
                     className="h-32 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-40"
                  />
               </div>

               <div className="flex items-center justify-between gap-2 p-3 sm:p-4">
                  <div>
                     <h3 className="font-serif text-sm font-bold text-forest sm:text-base">
                        {category.name}
                     </h3>

                     <p className="mt-1 text-[10px] text-ink/60">
                        {category.description}
                     </p>
                  </div>

                  <span className="rounded-full bg-sage px-2 py-1 text-forest">
                     ↗
                  </span>
               </div>
            </Link>
         ))}
      </>
   )
};

export default CategoryCard;