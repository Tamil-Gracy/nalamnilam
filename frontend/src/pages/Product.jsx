
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

const API = import.meta.env.VITE_API_URL;

const Product = () => {
   const navigate = useNavigate();
   const { productId } = useParams();
   const [loading, setLoading] = useState(true);
   const [product, setProduct] = useState(null);
   const [relatedProducts, setRelatedProducts] = useState(null);

   const [stock, setStock] = useState(null);

   const { addToCart } = useCart();


   useEffect(() => {
      const fetchProduct = async () => {
         setLoading(true);
         setProduct(null);

         try {
            const response = await axios.get(
               `${API}/api/products/${productId}`
            );
            const inventoryRes = await axios.get(
               `${API}/api/inventory/product/${productId}`
            );
            setStock(inventoryRes.data.data)

            //console.log("Fetched product:", response.data.data);
            //console.log("Category:", response.data.data?.category);

            setProduct(response.data.data);
         } catch (error) {
            console.error("Failed to fetch product:", error);
            setProduct(null);
         } finally {
            setLoading(false);
         }
      };

      if (productId) {
         fetchProduct();
      } else {
         setLoading(false);
      }
   }, [productId]);

   useEffect(() => {
      const fetchRelatedProducts = async () => {
         if (!product) return;

         try {
            const response = await axios.get(
               `${API}/api/products`
            );

            const allProducts = response.data.data;

            const currentCategoryId = product.category?._id;

            const related = allProducts.filter((item) => {
               return (
                  item.category?._id === currentCategoryId &&
                  item._id !== product._id
               );
            });

            setRelatedProducts(related.slice(0, 4));

         } catch (error) {
            console.error("Failed to fetch related products:", error);
         }
      };

      fetchRelatedProducts();
   }, [product]);



   const [quantity, setQuantity] = useState(1);

   if (loading) {
      return <p className="p-8">Loading product...</p>;
   }

   if (!product) {
      return <p className="p-8">Product not found.</p>;
   }



   return (

      <section className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">

         {/* Breadcrumb */}
         <nav className="flex flex-wrap items-center gap-2 text-xs text-ink/55">
            <Link to="/" className="transition hover:text-forest">
               Home
            </Link>
            <span>/</span>
            <Link to="/shop" className="transition hover:text-forest">
               Shop
            </Link>
            <span>/</span>
            <span className="font-medium text-forest">
               {product.category?.name}
            </span>
            <span>/</span>
            <span> {product.name}</span>
         </nav>

         {/* Product Details */}
         <div className="mt-7 grid items-start gap-8 lg:grid-cols-2 lg:gap-10">

            {/* Product Image Gallery */}
            <div className="grid md:grid-cols-[62px_minmax(0,1fr)] gap-3 sm:grid-cols-[76px_minmax(0,1fr)] sm:gap-4">

               {/* Thumbnails */}
               <div className="flex flex-col gap-3">

                  {/* {productImages.map((image, index) => (
                     <button
                        key={image}
                        type="button"
                        onClick={() => setActiveImage(index)}
                        aria-label={`View product image ${ index + 1 } `}
                        aria-pressed={activeImage === index}
                        className={`overflow - hidden rounded - xl border - 2 bg - sand transition ${
   activeImage === index
      ? "border-forest ring-2 ring-forest/10"
      : "border-transparent hover:border-forest/40"
} `}
                     >
                        <img
                           src={image}
                           alt={`Ragi product view ${ index + 1 } `}
                           className="aspect-square w-full object-cover"
                        />
                     </button>
                  ))} */}
               </div>

               {/* Main Image */}
               <div className="relative overflow-hidden rounded-2xl bg-sand">
                  <img
                     src={`${API}${product.image}`}
                     alt={product.name}
                     className="aspect-square w-full object-cover"
                  />

                  <span className="absolute left-3 top-3 rounded-full border border-forest/10 bg-[#fffdf8]/95 px-3 py-1.5 text-[10px] font-semibold text-forest shadow-sm sm:left-4 sm:top-4 sm:text-xs">
                     Organic Selection
                  </span>

                  <button
                     type="button"
                     aria-label="Add product to wishlist"
                     className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#fffdf8]/95 text-lg text-forest shadow-sm transition hover:bg-white sm:right-4 sm:top-4"
                  >
                     ♡
                  </button>
               </div>
            </div>

            {/* Product Information */}
            <div className="pt-1 lg:pt-2">

               <p className="text-[10px] font-bold tracking-[0.18em] text-forest sm:text-xs uppercase">
                  {product.category?.name} · GOODNESS GROWN NATURALLY
               </p>

               <h1 className="my-3 font-serif text-2xl font-bold leading-tight text-ink sm:text-3xl xl:text-4xl">
                  {product.name}
               </h1>
               <span
                  className={`rounded-full border border-forest/10 px-3 py-1 text-[10px] font-semibold shadow-sm sm:left-4 sm:top-4 sm:text-xs  ${stock > 0
                        ? "text-white bg-forest"
                        : "text-red-700 bg-red-100"
                     }`}
               >
                  {stock > 0 ? "In Stock" : "Out of Stock"}
               </span>

               {/* Rating */}
               <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="text-lg tracking-wide text-amber-500">
                     ★★★★★
                  </span>
                  <span className="text-sm font-bold text-ink">4.8</span>
                  <span className="text-xs text-ink/50">
                     (124 reviews)
                  </span>
               </div>

               {/* Price */}
               <div className="mt-5 flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-forest sm:text-4xl">
                     ₹{product.price}
                  </span>
                  <span className="text-sm text-ink/55">/ {product.quantity}{product.unit}</span>
               </div>

               <p className="mt-4 max-w-xl text-sm leading-6 text-ink/65">
                  {product.description}
               </p>

               {/* Product Benefits */}
               <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="flex items-center gap-2 rounded-xl bg-sage/70 p-3">
                     <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-forest">
                        ♧
                     </span>
                     <span className="text-[11px] font-semibold text-ink">
                        Organic Sourcing
                     </span>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl bg-sage/70 p-3">
                     <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-forest">
                        ✓
                     </span>
                     <span className="text-[11px] font-semibold text-ink">
                        Quality Checked
                     </span>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl bg-sage/70 p-3">
                     <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-forest">
                        ♡
                     </span>
                     <span className="text-[11px] font-semibold text-ink">
                        Naturally Wholesome
                     </span>
                  </div>
               </div>

               {/* Quantity and Actions */}
               <div className="mt-7 flex flex-wrap items-center gap-3">
                  <button
                     type="button"
                     disabled={stock <= 0}
                     className={`h-12 min-w-[150px] flex-1 rounded-xl px-5 text-sm font-semibold text-white shadow-sm transition sm:flex-none sm:px-8 ${stock <= 0
                           ? "cursor-not-allowed bg-gray-400 opacity-60"
                           : "cursor-pointer bg-forest hover:bg-leaf"
                        }`}
                     onClick={() => addToCart(product)}
                  >
                     {stock <= 0
                           ? "Out of Stock"
                           : "Add to Cart"}
                  </button>
                  {stock > 0 && (
                     <button
                        type="button"
                        className="h-12 w-full rounded-xl border border-forest/20 bg-transparent px-6 text-sm font-semibold text-forest transition hover:bg-sage sm:w-auto cursor-pointer"
                        onClick={() => {
                           navigate("/checkout", {
                              state: {
                                 items: [
                                    {
                                       productId: product,
                                       quantity: product.quantity,
                                    },
                                 ],
                                 source: "buyNow",
                              },
                           });
                        }}
                     >
                        Buy Now
                     </button>
                  )}
               </div>

               <p className="mt-3 text-xs text-ink/50">
                  Quantity:  {product.quantity}{product.unit} · Subtotal: ₹{Number(product.price) * quantity}
               </p>

               {/* Delivery Information */}
               <div className="mt-6 rounded-2xl border border-[#eee9dc] bg-[#fffdf8] p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                     <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage text-lg text-forest">
                        ↗
                     </span>
                     <div>
                        <p className="text-sm font-semibold text-ink">
                           Delivery to your doorstep
                        </p>
                        <p className="mt-1 text-xs leading-5 text-ink/60">
                           Enter your PIN code at checkout to check delivery
                           availability and estimated arrival.
                        </p>
                     </div>
                  </div>
               </div>

               <p className="mt-4 text-[11px] leading-5 text-ink/50">
                  Product appearance and availability may vary by batch.
                  Organic certification claims should match the product's
                  verified certification details.
               </p>
            </div>
         </div>

         {/* Product Information Sections */}
         <div className="mt-12 grid gap-4 border-t border-[#eee9dc] pt-8 sm:grid-cols-3">
            <div className="rounded-2xl bg-[#fffdf8] p-5">
               <h3 className="font-serif text-lg font-bold text-forest">
                  Quality You Can Trust
               </h3>
               <p className="mt-2 text-xs leading-6 text-ink/65">
                 Every product comes with essential details to help you shop confidently and choose what suits your household needs.
               </p>
            </div>

            <div className="rounded-2xl bg-[#fffdf8] p-5">
               <h3 className="font-serif text-lg font-bold text-forest">
                  Storage Instructions
               </h3>
               <p className="mt-2 text-xs leading-6 text-ink/65">
                  Store in a clean, dry, airtight container away from
                  moisture, heat and direct sunlight.
               </p>
            </div>

            <div className="rounded-2xl bg-[#fffdf8] p-5">
               <h3 className="font-serif text-lg font-bold text-forest">
                  Packaging & Delivery
               </h3>
               <p className="mt-2 text-xs leading-6 text-ink/65">
                  Delivery options and estimated arrival depend on the
                  destination PIN code and courier serviceability.
               </p>
            </div>
         </div>

         {/* Related Products */}
         <div className="mt-14 border-t border-[#eee9dc] pt-9">
            <div className="flex items-end justify-between gap-3">
               <div>
                  <p className="text-[10px] font-bold tracking-[0.18em] text-forest">
                     DISCOVER MORE
                  </p>
                  <h2 className="mt-2 font-serif text-2xl font-bold text-ink sm:text-3xl">
                     You may also like
                  </h2>
               </div>

               <Link
                  to="/shop"
                  className="text-xs font-semibold text-forest transition hover:text-leaf"
               >
                  View all →
               </Link>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4">
               {relatedProducts?.map((product) => (
                  <article
                     key={product.name}
                     className="overflow-hidden rounded-2xl border border-[#eee9dc] bg-[#fffdf8] p-2 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                     <Link
                        to={`/product/${product._id}`}
                        className="relative block overflow-hidden rounded-xl bg-sand"
                     >
                        <img
                           src={`${API}${product.image}`}
                           alt={product.name}
                           loading="lazy"
                           className="aspect-square w-full object-cover transition duration-300 hover:scale-105"
                        />

                        <span className="absolute left-2 top-2 rounded-full bg-forest px-2.5 py-1 text-[9px] font-semibold text-white">
                           {product.badge}
                        </span>
                     </Link>

                     <div className="px-1 pb-1 pt-3">
                        <Link
                           to={`/product/${product._id}`}
                           className="text-xs font-semibold text-ink transition hover:text-forest"
                        >
                           {product.name}
                        </Link>

                        <p className="mt-1 text-[10px] text-ink/55 line-clamp-3">
                           {product.description}
                        </p>

                        <p className="mt-2 font-serif text-base font-bold text-forest">
                           ₹{product.price}
                        </p>
                        
                        <button
                           type="button"
                           disabled={stock <= 0}
                           className={`mt-3 w-full rounded-xl  px-2 py-2.5 text-[10px] font-semibold text-white transition hover:bg-leaf cursor-pointer ${stock <= 0
                              ? "cursor-not-allowed bg-gray-400 opacity-60"
                              : "cursor-pointer bg-forest hover:bg-leaf"
                              }`}
                           onClick={() => addToCart(product)}
                        >
                           {stock <= 0
                              ? "Out of Stock"
                              : "Add to Cart"}
                        </button>
                     </div>
                  </article>
               ))}
            </div>
         </div>
      </section>
   );
};

export default Product;