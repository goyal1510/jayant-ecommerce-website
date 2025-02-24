import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  selectedItems: 0,
  totalPrice: 0,
  tax: 0,
  taxRate: 0.05,
  grandTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
      updateCartState(state);
    },
    addToCart: (state, action) => {
      const itemIndex = state.items.findIndex(item => item.productId === action.payload.productId);
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      updateCartState(state);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.productId !== action.payload);
      updateCartState(state);
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(item => item.productId === action.payload);
      if (item) item.quantity += 1;
      updateCartState(state);
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(item => item.productId === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter(item => item.productId !== action.payload);
      }
      updateCartState(state);
    },
    clearCart: (state) => {
      state.items = [];
      updateCartState(state);
    }
  }
});

const updateCartState = (state) => {
  state.selectedItems = state.items.reduce((total, item) => total + item.quantity, 0);
  state.totalPrice = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  state.tax = state.totalPrice * state.taxRate;
  state.grandTotal = state.totalPrice + state.tax;
};

export const { setCart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
