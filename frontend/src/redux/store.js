import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice.js'
import authApi from './features/auth/authApi.js'
import authReducer from "./features/auth/authSlice"
import productsApi from './features/products/productsApi.js'

export const store = configureStore({
    reducer: {
        // Reducer for the cart slice.
        cart: cartReducer,
        // Reducer for the auth API slice.
        [authApi.reducerPath]: authApi.reducer,
        // Reducer for the products API slice.
        [productsApi.reducerPath]: productsApi.reducer,
        // Reducer for the authentication slice.
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        // Concatenate the default middleware with the authApi and productsApi middleware.
        getDefaultMiddleware().concat(authApi.middleware, productsApi.middleware),
})