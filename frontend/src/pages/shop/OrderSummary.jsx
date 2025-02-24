import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/features/cart/cartSlice.js";
import axios from "axios";

import { getBaseUrl } from "../../utils/baseURL.js";

const API_URL = getBaseUrl ? `${getBaseUrl}/api/cart` : "http://localhost:5000/api/cart";

const OrderSummary = () => {
    const cartState = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    // Clear cart
    const handleClearCart = async () => {
      try {
          await axios.delete(`${API_URL}/clear`, { withCredentials: true });
          dispatch(clearCart());
      } catch (error) {
          console.error("Error clearing cart:", error);
      }
  };
  return (
    <div className="bg-primary-light mt-5 rounded text-base p-2">
        <div className="flex justify-center flex-col">
            <h2 className="text-xl text-text-dark mb-2">Order Summary</h2>
            <p className="text-sm flex justify-between">Selected Items <span>{cartState.selectedItems}</span></p>
            <p className="text-sm flex justify-between">Total Price <span>$ {cartState.totalPrice.toFixed(2)}</span></p>
            <p className="text-sm flex justify-between">Tax ({cartState.taxRate * 100}%) <span>$ {cartState.tax.toFixed(2)}</span></p>

            <p className="font-bold flex justify-between">Grand Total <span>$ {cartState.grandTotal.toFixed(2)}</span></p>
            <div className="flex flex-wrap gap-4 justify-center mt-4">

                <button className="bg-primary-dark text-white px-4 py-2 rounded-md" onClick={() => handleClearCart()}>
                <i className="ri-delete-bin-fill mr-1"></i>Clear Cart
                </button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-md">
                <i className="ri-arrow-right-s-line mr-1"></i>Proceed
                </button>
            </div>
        </div>


    </div>



  )

}
export default OrderSummary