import { useState } from "react";
import ProductCards from "./ProductCards.jsx";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi.js";

const TrendingProducts = () => {
    // State to manage the number of visible products.
    const [visible, setVisible] = useState(8);

    // Function to load more products.
    const loadMore = () => {
        setVisible(visible => visible + 4);
    };

    // Fetch all products using the products API.
    const { data: { products = [] } = {} } = useFetchAllProductsQuery({});

    return (
        <section className="section__container product__container">
            <h2 className="section__header">Trending Products</h2>
            <p className="section__subheader">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla rerum sit voluptas expedita libero dolorem tempore amet.</p>
            <div className="mt-12">
                {/* Render ProductCards component with sliced products based on the 'visible' state. */}
                <ProductCards products={products.slice(0, visible)} />
            </div>
            <div className="product__btn">
                {/* Conditionally render the "Load More" button if there are more products to show. */}
                {visible < products.length && <button onClick={loadMore} className="btn">Load More</button>}
            </div>
        </section>
    );
};

export default TrendingProducts;