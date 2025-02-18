/* eslint-disable react/prop-types */
const ShopFiltering = ({filters, setFilteresState, clearFilters, filteresState}) => {
    

    return (
    
    <div className="space-y-5 flex-shrink-0">
        <h3>Filters</h3>
        <div className="flex flex-col space-y-2">
            <h4 className="font-medium text-lg">Category</h4>
            <hr />
            {
                filters.categories.map((category) => (
                    <label key={category} className="capitalize cursor-pointer">
                        <input type="radio" name="category" id={category} value={category}
                        checked={filteresState.categories === category}
                        onChange={(e)=>setFilteresState({...filteresState, categories: e.target.value})}
                        />
                        {category}
                    </label>
                ))
            }
        </div>
        <div className="flex flex-col space-y-2">
            <h4 className="font-medium text-lg">Colors</h4>
            <hr />
            {
                filters.colors.map((color) => (
                    <label key={color} className="capitalize cursor-pointer">
                        <input type="radio" name="color" id={color} value={color} 
                        checked={filteresState.colors === color}
                        onChange={(e)=>setFilteresState({...filteresState, colors: e.target.value})}
                        />
                        {color}
                    </label>
                ))
            }
        </div>
        <div className="flex flex-col space-y-2">
            <h4 className="font-medium text-lg">Category</h4>
            <hr />
            {
                filters.priceRanges.map((priceRange) => (
                    <label key={priceRange} className="capitalize cursor-pointer">
                        <input type="radio" name="priceRange" id={priceRange} value={`${priceRange.min}-${priceRange.max}`} 
                        checked={filteresState.priceRanges === `${priceRange.min}-${priceRange.max}`}
                        onChange={(e)=>setFilteresState({...filteresState, priceRanges: e.target.value})}
                        />
                        {priceRange.label}
                    </label>
                ))
            }
        </div>

        <button className="bg-primary py-1 px-2 rounded text-white" onClick={clearFilters}>Clear Filters</button>
    </div>
  )
}
export default ShopFiltering;