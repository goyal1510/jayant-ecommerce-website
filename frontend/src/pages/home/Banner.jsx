import { Link } from "react-router-dom";
import banner_image from "../../assets/header.png";

const Banner = () => {
    return (
        <div className="section__container header__container">
            <div className="header__content z-30">
                <h4 className="uppercase">Up to 20% discount on</h4>
                <h1>Girl&apos;s Fashion</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
                <button className="btn"><Link to="/shop">EXPLORE</Link></button> {/* Link to shop page */}
            </div>
            <div className="header__image">
                <img src={banner_image} alt="banner_image" />
            </div>
        </div>
    );
};

export default Banner; // Export component
