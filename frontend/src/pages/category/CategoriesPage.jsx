import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import products from '../../data/products.json';
import ProductCards from '../shop/ProductCards';
const CategoriesPage = () => {
    const { categoryName } = useParams();
    const [fproducts, setFProducts] = useState([]);
    useEffect(() => {
        const filteredProducts = products.filter((product) => product.category.toLowerCase() == categoryName.toLowerCase());
        setFProducts(filteredProducts);
    }, [categoryName])

    useEffect(()=>{
        window.scrollTo(0,0);
    },[])
    return (
        <>
            <section className="section__container bg-primary-light">

                <h2 className="section__header capitalize">{categoryName}</h2>
                <p className="section__subheader">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio recusandae ex illo nemo? Quas itaque placeat quis eligendi sequi? Tenetur corrupti, blanditiis dicta dolores velit veniam a consectetur tempore optio!</p>
            </section>
            <div className='section__container'>
                <ProductCards products={fproducts} />
            </div>
        </>

    )
}
export default CategoriesPage