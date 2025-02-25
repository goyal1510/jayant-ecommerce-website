import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home.jsx";
import CategoriesPage from "../pages/category/CategoriesPage.jsx";
import Search from "../pages/search/Search.jsx";
import ShopPage from "../pages/shop/ShopPage.jsx";
import SingleProduct from "../pages/shop/productDetails/SingleProduct.jsx";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";

// Create a router using createBrowserRouter from react-router-dom.
const router = createBrowserRouter([
    {
        // Root path, renders the App component.
        path: "/",
        element: <App />,
        // Define nested routes within the App component.
        children: [
            {
                // Home page route.
                path: "/",
                element: <Home />,
            },
            {
                // Category page route, with a dynamic categoryName parameter.
                path: "/categories/:categoryName",
                element: <CategoriesPage />,
            },
            {
                // Search page route.
                path: "/search",
                element: <Search />,
            },
            {
                // Shop page route.
                path: "/shop",
                element: <ShopPage />,
            },
            {
                // Single product page route, with a dynamic id parameter.
                path: "/shop/:id",
                element: <SingleProduct />,
            },
        ],
    },
    {
        // Login page route.
        path: "/login",
        element: <Login />,
    },
    {
        // Register page route.
        path: "/register",
        element: <Register />,
    },
]);

export default router;