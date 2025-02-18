import { Link } from "react-router-dom"
import banner_image from "../../assets/header.png"

const Banner = () => {
    return (
        <div className="section__container header__container">
            <div className="header__content z-30">
                <h4 className="uppercase">Up to 20% discount on</h4>
                <h1>Girl&apos;s Fashion</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus asperiores quod sit quo quos exercitationem vitae quae quis? Dolore deleniti neque magnam harum consectetur pariatur porro maxime tempora voluptatibus facilis.</p>
                <button className="btn"><Link to="/shop">EXPLORE</Link></button>
            </div>
            <div className="header__image">
                <img src={banner_image} alt="banner_image" />
            </div>
        </div>
    )
}

export default Banner