import { Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
        <section className="relative  overflow-hidden bg-sand">
           <picture>
              <source srcSet="../../images/home-mob-banner.jpeg" media="(max-width: 640px)" />
              <source srcSet="../../images/home-banner.jpeg" media="(min-width: 641px)" />
              <img src="../../images/home-banner.jpeg" alt="Fresh farm vegetables" className="absolute inset-0  w-full md:object-cover md:object-right md:h-full" />
           </picture>

        <div className="relative  max-w-2xl px-10 py-14 md:py-16">
          <h1 className="mt-3 max-w-xl font-serif text-4xl font-bold leading-[1.13] text-[#17372a] md:text-5xl">
            Pure Goodness
            <br />
            From Our Farms
            <br />
            to Your Home
          </h1>

          <p className="mt-4 max-w-md text-xs leading-6 md:text-sm">
            Fresh vegetables, seasonal fruits and nutritious millets directly
            from local farmers. Healthy food. A better tomorrow.
          </p>

          <div className="mt-5 flex max-w-md items-center overflow-hidden rounded-full bg-white p-1 shadow-soft">
            <span className="px-3 text-xl text-forest">⌖</span>

            <span className="flex-1 text-[10px] text-ink/55">
              Enter your 6 digit PIN code
            </span>

            <button className="rounded-full bg-forest px-5 py-3 text-[11px] font-semibold text-white">
              Check Delivery
            </button>
          </div>
        </div>

        {/* <div className="absolute right-8 top-12 hidden rotate-[-10deg] font-serif italic text-white drop-shadow md:block">
          Support
          <br />
          Local Farmers ♡
        </div> */}
      </section>

      {/* Categories Section */}
      <section className="mx-auto grid max-w-7xl gap-4 px-5 py-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Vegetables */}
      <CategoryCard />

        {/* Store Benefits */}
        <div className="grid gap-3 rounded-2xl bg-sage p-5">
          <div className="flex gap-3">
            <span className="text-2xl text-forest">♧</span>

            <p className="text-[10px]">
              <b className="block">100% Natural Produce</b>
              <span className="mt-1 block text-ink/65">
                No harmful chemicals
              </span>
            </p>
          </div>

          <div className="flex gap-3">
            <span className="text-2xl text-forest">♙</span>

            <p className="text-[10px]">
              <b className="block">Direct from Farmers</b>
              <span className="mt-1 block text-ink/65">
                Fair for farmers, fresh for you
              </span>
            </p>
          </div>

          <div className="flex gap-3">
            <span className="text-2xl text-forest">🚚</span>

            <p className="text-[10px]">
              <b className="block">Local Delivery</b>
              <span className="mt-1 block text-ink/65">
                Only in selected areas
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Today's Fresh Picks */}
      <section className="mx-auto max-w-7xl px-5 py-5">
        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold tracking-wider text-forest">
              TODAY'S FRESH PICKS
            </p>

            <h2 className="mt-2 font-serif text-2xl font-bold md:text-3xl">
              Handpicked for Your Good Health
            </h2>
          </div>

          <Link
            to="/shop"
            className="text-[11px] font-medium text-forest"
          >
            View All Products →
          </Link>
        </div>

           <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          <ProductCard />
         

        </div>
      </section>

      {/* Our Farmers Section */}
      <section
        id="farmers"
        className="mx-auto grid max-w-7xl items-center gap-7 px-5 py-8 md:grid-cols-3"
      >
        <img
          src="../../images/farmer.jpg"
          alt="Local farmer with fresh harvest"
          className="h-64 w-full object-cover md:col-span-1"
        />

        <div>
          <p className="text-[10px] font-bold tracking-wider text-forest">
            OUR FARMERS
          </p>

          <h2 className="mt-2 font-serif text-2xl font-bold">
            Real People. Real Harvests.
          </h2>

          <p className="mt-3 text-xs leading-6 text-ink/75">
            We work directly with local farmers to bring you fresh,
            chemical-free produce while supporting their hard work and
            sustainable farming.
          </p>

          <Link
            to="/contact"
            className="mt-5 inline-flex rounded-full border border-forest px-5 py-3 text-[10px] font-semibold"
          >
            Meet Our Farmers →
          </Link>
        </div>

        {/* Delivery Availability */}
        <div className="rounded-3xl bg-sage p-6">
          <div className="text-3xl text-forest">⌖</div>

          <h3 className="font-serif text-xl font-bold">
            Check if we deliver
            <br />
            to your area
          </h3>

          <p className="mt-2 text-xs leading-5 text-ink/70">
            Enter your 6 digit PIN code to see if we are available in your
            location.
          </p>

          <div className="mt-4 flex rounded-full bg-white p-1">
            <span className="flex-1 px-3 py-2 text-[10px] text-ink/50">
              Enter PIN code
            </span>

            <button className="rounded-full bg-forest px-5 text-[10px] text-white">
              Check
            </button>
          </div>

          <p className="mt-3 text-[9px] text-ink/60">
            ♧ &nbsp; We currently deliver to selected PIN codes only.
          </p>
        </div>
      </section>

      {/* Healthy Choices Banner */}
      <section
        className="bg-[#143b26] text-white"
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgba(13, 49, 30, 0.95), rgba(17, 57, 31, 0.72)), url("../../images/millet-banner.jpg")',
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-9 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-[9px] font-semibold tracking-widest">
              GOOD FOOD · BETTER TOMORROW
            </p>

            <h2 className="mt-2 font-serif text-3xl font-bold">
              Healthy Choices for
              <br />
              You and the Planet
            </h2>

            <p className="mt-2 text-xs">
              Choose fresh. Choose local. Choose Nalam Nilam.
            </p>

            <Link
              to="/shop"
              className="mt-4 inline-flex rounded-full bg-cream px-5 py-3 text-[10px] font-semibold text-forest"
            >
              Shop Now →
            </Link>
          </div>

          {/* Store Benefits */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <span className="text-3xl">♧</span>

              <p className="mt-2 text-[10px] font-semibold">
                Organic & Natural
              </p>

              <small className="text-[9px] text-white/70">
                No preservatives
              </small>
            </div>

            <div>
              <span className="text-3xl">♡</span>

              <p className="mt-2 text-[10px] font-semibold">
                Better Nutrition
              </p>

              <small className="text-[9px] text-white/70">
                For a healthier you
              </small>
            </div>

            <div>
              <span className="text-3xl">♧</span>

              <p className="mt-2 text-[10px] font-semibold">
                Sustainable Farming
              </p>

              <small className="text-[9px] text-white/70">
                For a greener future
              </small>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;