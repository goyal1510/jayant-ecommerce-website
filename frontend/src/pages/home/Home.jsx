import { useEffect } from "react";
import TrendingProducts from "../shop/TrendingProducts.jsx";
import Banner from "./Banner.jsx";
import Categories from "./Categories.jsx";
import HeroSection from "./HeroSection.jsx";
import DealsSection from "./DealsSection.jsx";
import PromoBanner from "./PromoBanner.jsx";
import Blogs from "../blogs/Blogs.jsx";

const Home = () => {
  useEffect(() => {
    // Scroll to the top smoothly when the component mounts
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Banner />
      <Categories />
      <HeroSection />
      <TrendingProducts />
      <DealsSection />
      <PromoBanner />
      <Blogs />
    </>
  );
};

export default Home;
