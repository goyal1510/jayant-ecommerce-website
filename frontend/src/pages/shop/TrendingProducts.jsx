import { useState } from "react";
import ProductCards from "./ProductCards.jsx"
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi.js";
const TrendingProducts = () => {

    const [visible, setVisible] = useState(8);
    const loadMore = () => {
        setVisible(visible => visible + 4);
    }
    const { data: { products = []} = {}} = useFetchAllProductsQuery({})
  return (
    <section className="section__container product__container">
        <h2 className="section__header">Trending Products</h2>
        <p className="section__subheader">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla rerum sit voluptas expedita libero dolorem tempore amet.</p>
        <div className="mt-12">
        <ProductCards products={products.slice(0,visible)}/>
        </div>
        <div className="product__btn">
            {
                visible < products.length && <button onClick={loadMore} className="btn">Load More</button>
            }
        </div>
        
    </section>
  )
}

export default TrendingProducts