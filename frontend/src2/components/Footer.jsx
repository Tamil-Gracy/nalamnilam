import { Link } from "react-router-dom";

function Footer() {
   return (
      <footer id="footer" className="bg-[#102f21] text-white">
         <div className="mx-auto max-w-7xl px-5 py-8">
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
               {/* Logo */}
               <div>
                  <Link to="/" className="flex items-center gap-2">
                     <img src="../../images/logo.png" className="w-auto h-12" />
                  </Link>
               </div>

               {/* Quick Links */}
               <div>
                  <h3 className="mb-3 text-xs font-semibold">Quick Links</h3>
                  <Link className="block py-1 text-[10px] text-white/70" to="/">
                     Home
                  </Link>
                  <Link className="block py-1 text-[10px] text-white/70" to="/shop">
                     Shop
                  </Link>
                  <Link className="block py-1 text-[10px] text-white/70" to="/profile">
                     My Account
                  </Link>
                  <Link className="block py-1 text-[10px] text-white/70" to="/admin">
                     Admin Panel
                  </Link>
               </div>

               {/* Customer Care */}
               <div>
                  <h3 className="mb-3 text-xs font-semibold">Customer Care</h3>
                  <Link to="/faqs"><p className="py-1 text-[10px] text-white/70">FAQs</p></Link>
                  <Link to="/shipping-delivery"><p className="py-1 text-[10px] text-white/70">Shipping & Delivery</p></Link>
                  <Link to="/returns-policy"><p className="py-1 text-[10px] text-white/70">Returns Policy</p></Link>
                  <Link to="/terms-conditions"><p className="py-1 text-[10px] text-white/70">Terms & Conditions</p></Link>
                  
               </div>

               {/* Stay Connected */}
               <div>
                  <h3 className="mb-3 text-xs font-semibold">Stay Connected</h3>
                  <div className="text-[10px] text-white/70 py-2">
                     <p className="mb-2">📞 +91 9876543210</p>
                     <p>✉️ nalamnilam@gmail.com</p>
                  </div>
                  <div className="flex gap-3 text-2xl">
                     <Link to="https://wa.me/"><span><i className="fa-brands fa-whatsapp"></i></span></Link>
                     <Link to="https://facebook.com/"><span><i className="fa-brands fa-facebook "></i></span></Link>
                     <Link to="https://instagram.com/"><span><i className="fa-brands fa-instagram "></i></span></Link>
                     <Link to="https://youtube.com/"><span><i className="fa-brands fa-youtube "></i></span></Link>
                        
                        
                        
                        
                     </div>
                  
               </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-6 flex flex-wrap justify-between gap-3 border-t border-white/20 pt-4 text-[9px] text-white/65">
               <span>© 2026 NalamNilam. All rights reserved.</span>
               <span className="font-serif italic">
                  Fresh Produce · Local Farmers · Stronger Communities ♧
               </span>
            </div>
         </div>
      </footer>
   );
}

export default Footer;