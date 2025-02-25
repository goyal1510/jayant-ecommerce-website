import { Link, useNavigate, useParams } from 'react-router-dom'
import RatingStars from '../../../components/RatingStars';
import { useDispatch, useSelector } from "react-redux"
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import { addToCart } from '../../../redux/features/cart/cartSlice';
import axios from "axios";
import { getBaseUrl } from "../../../utils/baseURL.js";

// Define API URL based on baseURL utility or fallback to localhost
const API_URL = getBaseUrl ? `${getBaseUrl}/api/cart/add` : "http://localhost:5000/api/cart";

const SingleProduct = () => {
    // Get product ID from URL params
    const { id } = useParams();
    // Get user data from Redux store
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Fetch product details using RTK Query
    const { data, error, isLoading } = useFetchProductByIdQuery(id);
    
    // Extract product details from API response
    const singleProduct = data?.product || {};

    // Function to handle adding product to cart
    const handleAddToCart = async (product) => {
        if (user) { // Check if user is logged in
            try {
                // Send request to add product to cart
                const response = await axios.post(API_URL, 
                    { productId: product._id, name: product.name, price: product.price, image: product.image, quantity: 1 }, 
                    { withCredentials: true }
                );
                dispatch(addToCart(response.data)); // Update Redux store with new cart data
            } catch (error) {
                console.error("Error adding to cart:", error.response?.data || error.message);
            }
        } else {
            alert("Please login to add items to cart"); // Show alert if user is not logged in
            navigate("/login"); // Redirect to login page
        }
    };

    // Display loading message while fetching product details
    if (isLoading) return <p>Loading...</p>;
    // Display error message if API call fails
    if (error) return <p>Error loading product details.</p>;

    return (
        <>
            {/* Breadcrumb navigation section */}
            <section className='section__container bg-primary-light'>
                <h2 className='section__header capitalize'>Single Product Page</h2>
                <div className='section__subheader space-x-2'>
                    <span className='hover:text-primary'><Link to="/">home</Link></span>
                    <i className="ri-arrow-right-s-line"></i>
                    <span className='hover:text-primary'><Link to="/shop">shop</Link></span>
                    <i className="ri-arrow-right-s-line"></i>
                    <span className='hover:text-primary'>{singleProduct.name}</span>
                </div>
            </section>

            {/* Product details section */}
            <section className='section__container mt-8'>
                <div className='flex flex-col items-center md:flex-row gap-8'>
                    
                    {/* Product image */}
                    <div className='md:w-1/2 w-full'>
                        <img src={singleProduct?.image} alt={singleProduct?.name} 
                        className='rounded-md w-full h-auto'
                        />
                    </div>

                    {/* Product details */}
                    <div className='md:w-1/2 w-full'>
                        <h3 className='text-2xl font-semibold mb-4'>{singleProduct?.name}</h3>
                        <p className='text-xl text-primary mb-4 space-x-1'>
                            ${singleProduct?.price} 
                            {singleProduct?.oldPrice && <s className='ml-1'>${singleProduct?.oldPrice}</s>}
                        </p>
                        <p className='text-gray-400 mb-4'>{singleProduct?.description}</p>

                        {/* Additional product info */}
                        <div className='flex flex-col space-y-2'>
                            <p><strong>Category:</strong> {singleProduct?.category}</p>
                            <p><strong>Color:</strong> {singleProduct?.color}</p>
                            <div className='flex gap-1 items-center'>
                                <strong>Rating: </strong>
                                <RatingStars rating={singleProduct?.rating}/>
                            </div>
                        </div>

                        {/* Add to Cart button */}
                        <button 
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent unwanted event bubbling
                            handleAddToCart(singleProduct);
                        }}
                        className='mt-6 px-6 py-3 bg-primary text-white rounded-md'>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section className="section__container mt-8">
                Reviews Here
            </section>
        </>
    )
}

export default SingleProduct;
