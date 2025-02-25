/* eslint-disable react/prop-types */

import { Link, useNavigate } from "react-router-dom";
import RatingStars from "../../components/RatingStars.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice.js";
import axios from "axios";
import { getBaseUrl } from "../../utils/baseURL.js";

const API_URL = getBaseUrl ? `${getBaseUrl}/api/cart/add` : "http://localhost:5000/api/cart";

const ProductCards = ({ products }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleAddToCart = async (product) => {
        if (user) {
            try {
                // Send a POST request to add the product to the cart.
                const response = await axios.post(API_URL,
                    { productId: product._id, name: product.name, price: product.price, image: product.image, quantity: 1 },
                    { withCredentials: true }
                );
                // Dispatch the addToCart action with the response data.
                dispatch(addToCart(response.data));
            } catch (error) {
                // Log any errors that occur during the add to cart process.
                console.error("Error adding to cart:", error.response?.data || error.message);
            }
        } else {
            // Alert the user to log in if they are not authenticated.
            alert("Please login to add items to cart");
            navigate("/login");
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {products.map((product) => (
                <div key={product._id} className="product__card">
                    <div className="relative">
                        <Link to={`/shop/${product._id}`}>
                            <img src={product.image} alt={product.name} className="max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-all duration-300 rounded-md" />
                        </Link>
                        <div className="hover:block absolute top-3 right-3">
                            <button onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(product);
                            }}>
                                <i className="ri-shopping-cart-2-line bg-primary text-white p-1.5 hover:bg-primary-dark"></i>
                            </button>
                        </div>
                    </div>
                    <div className='product__card__content'>
                        <h4>{product.name}</h4>
                        <p>${product.price} {product.oldPrice ? <s>${product.oldPrice}</s> : null}</p>
                        <RatingStars rating={product.rating} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductCards;