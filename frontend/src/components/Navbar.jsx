import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import CartModel from "../pages/shop/CartModel.jsx";
import avatarImg from "../assets/avatar.png"
import { useLogoutUserMutation } from "../redux/features/auth/authApi.js";
import { logout } from "../redux/features/auth/authSlice.js";
import axios from "axios";
import { clearCart, setCart } from "../redux/features/cart/cartSlice.js";
import { getBaseUrl } from "../utils/baseURL.js";

const API_URL = getBaseUrl ? `${getBaseUrl}/api/cart` : "http://localhost:5000/api/cart";
const Navbar = () => {
    const cartState = useSelector((state) => state.cart);

    const [isCartOpen, setIsCartOpen] = useState(false);
    const handleCartToggle = () => {
        setIsCartOpen(!isCartOpen);
    }
    const scrollToContact = (e) => {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    // show user if logged in
    const dispatch =  useDispatch();
    const { user } = useSelector((state) => state.auth);
    // console.log(user);
    // dropdown menus
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

    const handDropDownToggle = () => {
        setIsDropDownOpen(!isDropDownOpen)
    }

    // admin dropdown menus
    const adminDropDownMenus = [
        {label: "Dashboard", path: "/dashboard/admin"},
        {label: "Manage Items", path: "/dashboard/manage-products"},
        {label: "All Orders", path: "/dashboard/manage-orders"},
        {label: "Add Product", path: "/dashboard/add-product"},
    ]

    // user dropdown menus
    const userDropDownMenus = [
        {label: "Dashboard", path: "/dashboard"},
        {label: "Profile", path: "/dashboard/profile"},
        {label: "Payments", path: "/dashboard/payments"},
        {label: "Orders", path: "/dashboard/orders"},
    ]
    const dropdownMenus = user?.role === 'admin' ? [...adminDropDownMenus] : [...userDropDownMenus]
    const [logoutUser] = useLogoutUserMutation();
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(clearCart()); // Clear the cart on logout
        dispatch(logout()); // Ensure user auth state is cleared
        navigate("/");
        } catch (error) {
            console.error("Failed to log out", error)
        }
    }

    useEffect(() => {
        const fetchCart = async () => {
            if (user) {
                try {
                    const response = await axios.get(`${API_URL}`, { withCredentials: true });
                    dispatch(setCart(response.data));
                } catch (error) {
                    console.error("Error fetching cart:", error);
                }
            }
        };

        fetchCart();
    }, [user, dispatch]);  // Runs when user state changes

    return (
        <header className="fixed-nav-bar w-nav">
            <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">

                <ul className="nav__links">
                    <li className="link"><Link to="/">Home</Link></li>
                    <li className="link"><Link to="/shop">Shop</Link></li>
                    <li className="link"><Link to="/pages">Pages</Link></li>
                    <li className="link"><Link to="#contact" onClick={scrollToContact}>Contact</Link></li>
                </ul>
                {/* Logo */}
                <div className="nav__logo">
                    <Link to="/">Jayant<span>.</span></Link>
                </div>
                {/* Icons */}
                <div className="nav__icons relative">
                    <span><Link to="/search">
                        <i className="ri-search-line"></i>
                    </Link></span>

                    <span>
                        <button onClick={handleCartToggle} className="hover:text-primary">
                            <i className="ri-shopping-cart-fill"></i>
                            <sup className="text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center">
                                {cartState.items.length}

                            </sup>
                        </button>
                    </span>

                    <span>
                        {
                            user && user ? (<>
                                <img
                                    onClick={handDropDownToggle}
                                    src={user?.profileImage || avatarImg} alt="" className='size-6 rounded-full cursor-pointer' />
                                    
                                    {
                            isDropDownOpen && (
                                <div className='absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50'>
                                    <ul className='font-medium space-y-4 p-2'>
                                        {dropdownMenus.map((menu, index) => (
                                            <li key={index}>
                                                <Link 
                                                onClick={() => setIsDropDownOpen(false)}
                                                className='dropdown-items' to={menu.path}>{menu.label}</Link>
                                            </li>
                                        ))}
                                        
                                        <li><Link onClick={handleLogout} className='dropdown-items'>Logout</Link></li>
                                    </ul>
                                </div>
                            )
                          } </>)
                                    
                                    
                                    
                                    :(
                                    <Link to="/login">
                                    <i className="ri-user-line"></i>
                                </Link>)
                    }
                            </span>
                </div>
            </nav>
            {
                // isCartOpen && <CartModel products={cartState.items} isOpen={isCartOpen} onClose={handleCartToggle} />
                isCartOpen && <CartModel isOpen={isCartOpen} onClose={handleCartToggle} />
            }
        </header>
    )
}


export default Navbar