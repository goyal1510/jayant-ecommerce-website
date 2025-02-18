import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home.jsx";
import CategoriesPage from "../pages/category/CategoriesPage.jsx";
import Search from "../pages/search/Search.jsx";
import ShopPage from "../pages/shop/ShopPage.jsx";
import SingleProduct from "../pages/shop/productDetails/SingleProduct.jsx";
import Login from "../components/Login.jsx";
const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,

        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"/categories/:categoryName",
                element: <CategoriesPage/>
            },
            {
                path:"/search",
                element: <Search/>
            },
            {
                path:"/shop",
                element: <ShopPage/>
            },
            {
                path:"/shop/:id",
                element: <SingleProduct/>
            }



        ]
    },
    {
        path:"/login",
        element: <Login/>
    }
])
export default router;