import { Link } from "react-router-dom";

const CategoryCard = () => {
   return (
      <>
         <Link
            to="/shop"
            className="flex min-h-36 items-center gap-3 rounded-2xl bg-[#f5f0e4] p-3"
         >
            <img
               src="../../images/vegetables.jpg"
               alt="Vegetables"
               className="h-24 w-[48%] object-contain"
            />

            <span>
               <b className="text-sm">Vegetables</b>
               <small className="mt-1 block text-[10px] text-ink/65">
                  Fresh & Organic
               </small>
            </span>

            <span className="ml-auto self-end rounded-full bg-[#ebe6d8] p-2">
               →
            </span>
         </Link>

         {/* Fruits */}
         <Link
            to="/shop"
            className="flex min-h-36 items-center gap-3 rounded-2xl bg-[#f5f0e4] p-3"
         >
            <img
               src="../../images/fruits.jpg"
               alt="Fruits"
               className="h-24 w-[48%] object-contain"
            />

            <span>
               <b className="text-sm">Fruits</b>
               <small className="mt-1 block text-[10px] text-ink/65">
                  Seasonal & Juicy
               </small>
            </span>

            <span className="ml-auto self-end rounded-full bg-[#ebe6d8] p-2">
               →
            </span>
         </Link>

         {/* Millets */}
         <Link
            to="/shop"
            className="flex min-h-36 items-center gap-3 rounded-2xl bg-[#f5f0e4] p-3"
         >
            <img
               src="../../images/millets.jpg"
               alt="Millets"
               className="h-24 w-[48%] object-contain"
            />

            <span>
               <b className="text-sm">Millets</b>
               <small className="mt-1 block text-[10px] text-ink/65">
                  Nutritious & Natural
               </small>
            </span>

            <span className="ml-auto self-end rounded-full bg-[#ebe6d8] p-2">
               →
            </span>
         </Link>
      </>
   )
}
export default CategoryCard;