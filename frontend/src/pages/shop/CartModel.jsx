/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../../redux/features/cart/cartSlice.js";
import OrderSummary from "./OrderSummary.jsx";

const CartModel = ({ products, isOpen, onClose }) => {
    const dispatch = useDispatch();

    return (
        <div className={`fixed z-[1000] inset-0 bg-black bg-opacity-70 transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"} `}

            style={{ transition: "opacity 0.3s" }}>
            <div className={`fixed right-0 top-0 md:w-1/3 w-full bg-white h-full overflow-y-auto transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                style={{ transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}>
                <div className="p-4 mt-4">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-xl font-semibold">Your Cart</h4>
                        <button className="text-gray-900 hover:text-gray-300 transition-all duration-200 bg-primary hover:bg-primary rounded" onClick={onClose}>
                            <i className="ri-xrp-fill p-1"></i>
                        </button>
                    </div>

                    {
                        products.length > 0 && <OrderSummary />

                    }


                    <div>
                        {
                            products.length === 0 ? (
                                <p className="text-gray-500">Your cart is empty.</p>
                            ) : (
                                products.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col md:flex-row md:items-center md:justify-between shadow-md md:p-2 p-1 mb-4 mt-4"
                                    >
                                        <div className="flex items-center">
                                            <span className="mr-4 px-2 bg-primary text-white rounded-full">
                                                {index + 1}
                                            </span>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="size-12 object-cover mr-4"
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
                                                onClick={() => dispatch(decreaseQuantity(item.id))}
                                                className="size-6 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white transition-all duration-200"
                                            >-</button>
                                            <span className="bg-white text-primary py-1 rounded-full">{item.quantity}</span>
                                            <button
                                                onClick={() => dispatch(increaseQuantity(item.id))}
                                                className="size-6 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white transition-all duration-200"
                                            >+</button>
                                            <button
                                                onClick={() => dispatch(removeFromCart(item.id))}
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
export default CartModel