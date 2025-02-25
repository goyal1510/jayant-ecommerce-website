/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity, setCart } from "../../redux/features/cart/cartSlice.js";
import OrderSummary from "./OrderSummary.jsx";
import { useEffect } from "react";
import axios from "axios";
import { getBaseUrl } from "../../utils/baseURL.js";

const API_URL = getBaseUrl ? `${getBaseUrl}/api/cart` : "http://localhost:5000/api/cart";

const CartModel = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    // Fetch cart data from backend when component mounts
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get(`${API_URL}`, { withCredentials: true });
                dispatch(setCart(response.data));
            } catch (error) {
                console.error("Error fetching cart:", error);
                // Consider showing a user-friendly message or toast notification
            }
        };
        fetchCart();
    }, [dispatch]); // Added API_URL as a dependency to avoid stale reference issues

    // Increase quantity of an item in the cart
    const handleIncrease = async (productId) => {
        try {
            if (!cart?.items) return;
            const item = cart.items.find(item => item.productId === productId);
            if (!item) return console.error(`Item with productId ${productId} not found`);

            await axios.put(`${API_URL}/update/${productId}`, 
                { quantity: item.quantity + 1 },
                { withCredentials: true }
            );

            dispatch(increaseQuantity(productId));
        } catch (error) {
            console.error("Error increasing quantity:", error);
            // Display user-friendly error message
        }
    };

    // Decrease quantity of an item in the cart
    const handleDecrease = async (productId) => {
        if (!cart?.items) return;
        const item = cart.items.find(item => item.productId === productId);
        if (!item) return;

        if (item.quantity === 1) {
            handleRemove(productId);
            return;
        }

        try {
            await axios.put(`${API_URL}/update/${productId}`, 
                { quantity: item.quantity - 1 }, 
                { withCredentials: true }
            );
            dispatch(decreaseQuantity(productId));
        } catch (error) {
            console.error("Error decreasing quantity:", error);
            // Display user-friendly error message
        }
    };

    // Remove item from cart
    const handleRemove = async (productId) => {
        try {
            await axios.delete(`${API_URL}/remove/${productId}`, { withCredentials: true });
            dispatch(removeFromCart(productId));
        } catch (error) {
            console.error("Error removing item:", error);
            // Display user-friendly error message
        }
    };

    return (
        <div className={`fixed z-[1000] inset-0 bg-black bg-opacity-70 transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"} `}
            style={{ transition: "opacity 0.3s" }}>
            <div className={`fixed right-0 top-0 md:w-1/3 w-full bg-white h-full overflow-y-auto transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                style={{ transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}>
                <div className="p-4 mt-4">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-xl font-semibold">Your Cart</h4>
                        <button className="text-gray-900 hover:text-gray-300 transition-all duration-200 bg-primary hover:bg-primary rounded" onClick={onClose}>
                            <i className="ri-close-line p-1"></i>
                        </button>
                    </div>

                    {/* Show order summary only if cart has items */}
                    {cart?.items?.length > 0 && <OrderSummary />}

                    <div>
                        {cart?.items?.length === 0 ? (
                            <p className="text-gray-500">Your cart is empty.</p>
                        ) : (
                            cart.items.map((item, index) => (
                                <div
                                    key={item.productId}
                                    className="flex flex-col md:flex-row md:items-center md:justify-between shadow-md md:p-2 p-1 mb-4 mt-4 gap-2"
                                >
                                    <div className="flex items-center">
                                        <span className="mr-4 px-2 bg-primary text-white rounded-full">
                                            {index + 1}
                                        </span>
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="size-12 object-cover mr-4 max-w-[80px]" // Ensure images don't overflow
                                        />
                                        <div>
                                            <h5 className="text-lg font-medium">{item.name}</h5>
                                            <p className="text-gray-600 text-sm">
                                                ${Number(item.price).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center mt-2 md:mt-0 gap-2">
                                        <button
                                            onClick={() => handleDecrease(item.productId)}
                                            className="size-6 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white transition-all duration-200"
                                        >-</button>
                                        <span className="bg-white text-primary py-1 rounded-full">{item.quantity}</span>
                                        <button
                                            onClick={() => handleIncrease(item.productId)}
                                            className="size-6 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white transition-all duration-200"
                                        >+</button>
                                        <button
                                            onClick={() => handleRemove(item.productId)}
                                            className="size-6 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white transition-all duration-200"
                                        ><i className="ri-delete-bin-line p-1"></i></button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CartModel;
