import TrendingProducts from "../shop/TrendingProducts.jsx"
import Banner from "./Banner.jsx"
import Categories from "./Categories.jsx"
import HeroSection from "./HeroSection.jsx"
import DealsSection from "./DealsSection.jsx"
import PromoBanner from "./PromoBanner.jsx"
import Blogs from "../blogs/Blogs.jsx"
import { useEffect } from "react";
const Home = () => {
  useEffect(()=>{ 
    window.scrollTo({top:0,behavior:"smooth"});
  },[])

  return (
    <>
    <Banner/>
    <Categories/>
    <HeroSection/>
    <TrendingProducts/>

    <DealsSection/>
    <PromoBanner/>
    <Blogs/>
    </>
  )
}

export default Home