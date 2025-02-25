import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import products from '../../data/products.json';
import ProductCards from '../shop/ProductCards.jsx';

const CategoriesPage = () => {
    const { categoryName } = useParams();
    const [fproducts, setFProducts] = useState([]);

    useEffect(() => {
        // Filter products based on the category name from the URL.
        const filteredProducts = products.filter((product) => product.category.toLowerCase() === categoryName.toLowerCase());
        setFProducts(filteredProducts);
    }, [categoryName]);

    useEffect(() => {
        // Scroll to the top of the page when the component mounts.
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <section className="section__container bg-primary-light">
                <h2 className="section__header capitalize">{categoryName}</h2>
                <p className="section__subheader">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio recusandae ex illo nemo? Quas itaque placeat quis eligendi sequi? Tenetur corrupti, blanditiis dicta dolores velit veniam a consectetur tempore optio!</p>
            </section>
            <div className='section__container'>
                {/* Render the filtered products using the ProductCards component. */}
                <ProductCards products={fproducts} />
            </div>
        </>
    );
};

export default CategoriesPage;