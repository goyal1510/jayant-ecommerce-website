import { useState , useEffect} from "react";
import productsData from "../../data/products.json";
import ProductCards from "./ProductCards.jsx";
import ShopFiltering from "./ShopFiltering.jsx";

const filters = {
    categories: ['all', 'accessories', 'dress', 'jewellery', 'cosmetics'],
    colors: ['all', 'black', 'red', 'gold', 'blue', 'silver', 'beige', 'green'],
    priceRanges: [
      { label: 'Under $50', min: 0, max: 50 },
      { label: '$50 - $100', min: 50, max: 100 },
      { label: '$100 - $200', min: 100, max: 200 },
      { label: '$200 and above', min: 200, max: Infinity }
    ]
  };


const ShopPage = () => {
    
    const [products, setProducts] = useState(productsData);
    const [filteresState, setFilteresState] = useState({
        categories: 'all',
        colors: 'all',
        priceRanges: ''
    });

    const handleFilterChange = () => {
        let filteredProducts = productsData;
        if(filteresState.categories && filteresState.categories !== 'all'){
            filteredProducts = filteredProducts.filter(product => product.category === filteresState.categories);
        }
        if(filteresState.colors && filteresState.colors !== 'all'){
            filteredProducts = filteredProducts.filter(product => product.color === filteresState.colors);
        }
        const [minPrice, maxPrice] = filteresState.priceRanges.split('-').map(Number);
        if(filteresState.priceRanges && filteresState.priceRanges !== ''){
            filteredProducts = filteredProducts.filter(product => product.price >= minPrice && product.price <= maxPrice);
        }
        setProducts(filteredProducts);
    }

    useEffect(() => {
        handleFilterChange();
    });

    const clearFilters = () => {
        setFilteresState({
            categories: 'all',
            colors: 'all',
            priceRanges: ''
        });
    }
      


      
  return (
    <>
    <section className="section__container bg-primary-light">
        <h2 className="section__header">Shop</h2>
        <p className="section__subheader">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla rerum sit voluptas expedita libero dolorem tempore amet.</p>
      </section>
      <section className="section__container">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <ShopFiltering filters={filters} setFilteresState={setFilteresState} clearFilters={clearFilters} filteresState={filteresState}/>
            <div >
                <h4 className="text-xl font-medium mb-4">Available Products : {products.length}</h4>
                <ProductCards products={products} />
            </div>
        </div>

      </section>
    </>
  )
}
export default ShopPage