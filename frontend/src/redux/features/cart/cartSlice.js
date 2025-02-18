import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    selectedItems:0,
    totalPrice:0,
    tax:0,
    taxRate:0.05,
    grandTotal:0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const isExist = state.products.find((item) => item.id === action.payload.id);
            if(!isExist){
                state.products.push({...action.payload, quantity: 1});
            }else{
                alert('Item already in cart , increase quantity instead in Cart');
            }
            state.selectedItems = setSelectedItems(state);
            state.totalPrice = setTotalPrice(state);
            state.tax = setTax(state);
            state.grandTotal = setGrandTotal(state);
            alert('Item added to cart');

        },
        removeFromCart: (state, action) => {
            state.products = state.products.filter((item) => item.id !== action.payload);
            state.selectedItems = setSelectedItems(state);
            state.totalPrice = setTotalPrice(state);
            state.tax = setTax(state);
            state.grandTotal = setGrandTotal(state);
            alert('Item removed from cart');
        },
        increaseQuantity: (state, action) => {
            const productToIncrease = state.products.find(item => item.id === action.payload);
            if (productToIncrease) {
                productToIncrease.quantity += 1;
            }


            state.selectedItems = setSelectedItems(state);
            state.totalPrice = setTotalPrice(state);
            state.tax = setTax(state);
            state.grandTotal = setGrandTotal(state);
            alert(`Quantity increased for item ${productToIncrease.name}`);
        },
        decreaseQuantity: (state, action) => {
            const productToDecrease = state.products.find(item => item.id === action.payload);

            
            if (productToDecrease.quantity === 1) {
                state.products = state.products.filter(item => item.id !== action.payload);
            } else {
                
                state.products = state.products.map(item => {
                    if (item.id === action.payload) {
                        return { ...item, quantity: item.quantity - 1 };
                    }
                    return item;
                });
            }
            
            state.selectedItems = setSelectedItems(state);
            state.totalPrice = setTotalPrice(state);
            state.tax = setTax(state);
            state.grandTotal = setGrandTotal(state);
            alert(`Quantity decreased for item ${productToDecrease.name}`);
        },
        clearCart: (state) => {
            
            state.products = [];
            state.selectedItems = 0;
            state.totalPrice = 0;
            state.tax = 0;
            state.grandTotal = 0;
            alert('Cart is cleared');
        }
    }
});


export const setSelectedItems= (state) => state.products.reduce((total,product)=>{
    return Number(total + product.quantity);
},0);


export const setTotalPrice= (state) => state.products.reduce((total,product)=>{
    return Number(total + (product.price * product.quantity));
},0);

export const setTax= (state) => state.totalPrice * state.taxRate;

export const setGrandTotal= (state) => {
    return state.totalPrice + state.tax;
} 

export const {addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart} = cartSlice.actions;
export default cartSlice.reducer;