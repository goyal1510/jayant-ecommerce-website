import { useState } from "react"
import products from "../../data/products.json";
import ProductCards from "../shop/ProductCards.jsx";

const Search = () => {
  // State to store the search query entered by the user
  const [serachQuery, setSearchQuery] = useState("");
  // State to store the filtered products based on the search query
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Function to handle search logic
  const handleSearch = () => {
    const query = serachQuery.toLowerCase(); // Convert query to lowercase for case-insensitive search
    // Filter products based on name or description matching the query
    const filtered = products.filter((product) => 
      product.name.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered); // Update state with filtered products
  }

  return (
    <>
      {/* Search section header */}
      <section className="section__container bg-primary-light">
        <h2 className="section__header">Search</h2>
        <p className="section__subheader">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla rerum sit voluptas expedita libero dolorem tempore amet.
        </p>
      </section>

      {/* Search input field and button */}
      <section className="section__container">
        <div className="w-full mb-12 flex flex-col md:flex-row gap-4 justify-center">
          {/* Input field for entering search query */}
          <input
            className="search-bar w-full max-w-4xl p-2 border border-gray-700 focus:border-black rounded-md"
            type="text"
            value={serachQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products..."
          />
          {/* Search button to trigger search function */}
          <button 
            className='search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded' 
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {/* Display filtered products */}
        <ProductCards products={filteredProducts} />
      </section>
    </>
  )
}

export default Search;
