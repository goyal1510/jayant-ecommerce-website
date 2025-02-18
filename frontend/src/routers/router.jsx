import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import CategoriesPage from "../pages/category/CategoriesPage";
import Search from "../pages/search/Search";
import ShopPage from "../pages/shop/ShopPage";
import SingleProduct from "../pages/shop/productDetails/SingleProduct";
import Login from "../components/Login";
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