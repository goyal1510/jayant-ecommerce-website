import TrendingProducts from "../shop/TrendingProducts"
import Banner from "./Banner"
import Categories from "./Categories"
import HeroSection from "./HeroSection"
import DealsSection from "./DealsSection"
import PromoBanner from "./PromoBanner"
import Blogs from "../blogs/Blogs"
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