import { useState } from "react"
import products from "../../data/products.json";
import ProductCards from "../shop/ProductCards.jsx";


const Search = () => {

  const [serachQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = () => {
    const query = serachQuery.toLowerCase();
    const filtered = products.filter((product) => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query));
    setFilteredProducts(filtered);
  }



  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header">Search</h2>
        <p className="section__subheader">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla rerum sit voluptas expedita libero dolorem tempore amet.</p>
      </section>
      <section className="section__container">
        <div className="w-full mb-12  flex flex-col md:flex-row gap-4 justify-center">
          <input
            className="search-bar w-full max-w-4xl p-2 border border-gray-700 focus:border-black rounded-md"
            type="text"
            value={serachQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products..."
          />
          <button className='search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded' onClick={handleSearch}>Search</button>

        </div>
        <ProductCards products={filteredProducts} />
      </section>

    </>

  )
}
export default Search