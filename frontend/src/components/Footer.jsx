import instagram1 from "../assets/instagram-1.jpg"
import instagram2 from "../assets/instagram-2.jpg"
import instagram3 from "../assets/instagram-3.jpg"
import instagram4 from "../assets/instagram-4.jpg"
import instagram5 from "../assets/instagram-5.jpg"
import instagram6 from "../assets/instagram-6.jpg"

const Footer = () => {
  // Function to smoothly scroll to the Blogs section
  const scrollToBlogs = (e) => {
    e.preventDefault();
    const blogsSection = document.getElementById('blogs');
    if (blogsSection) {
      blogsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <footer className="section__container footer__container">
        {/* Contact Section */}
        <div id="contact" className="footer__col">
          <h4>CONTACT US</h4>
          <p>
            <span><i className="ri-map-pin-2-fill"></i></span>
            Sri Ganganagar, Rajasthan, India
          </p>
          <p>
            <span><i className="ri-mail-fill"></i></span>
            info@jayant.org.in
          </p>
          <p>
            <span><i className="ri-phone-fill"></i></span>
            +91 9413495328
          </p>
        </div>

        {/* Company Links */}
        <div className="footer__col">
          <h4>COMPANY</h4>
          <a href="/">Home</a>
          <a href="/">About Us</a>
          <a href="/">Work With Us</a>
          <a href="#blogs" onClick={scrollToBlogs}>Our Blogs</a> {/* Smooth scroll to blogs */}
          <a href="/">Terms & Condition</a>
        </div>

        {/* Useful Links */}
        <div className='footer__col'>
          <h4>USEFUL LINK</h4>
          <a href="/">Help</a>
          <a href="/">Track your order</a>
          <a href="/">Men</a>
          <a href="/">Women</a>
          <a href="/">Dresses</a>
        </div>

        {/* Instagram Image Grid */}
        <div className='footer_col'>
          <h4>INSTAGRAM</h4>
          <div className="instagram__grid">
            <img src={instagram1} alt="" />
            <img src={instagram2} alt="" />
            <img src={instagram3} alt="" />
            <img src={instagram4} alt="" />
            <img src={instagram5} alt="" />
            <img src={instagram6} alt="" />
          </div>
        </div>
      </footer>

      {/* Footer Bar */}
      <div className="footer__bar">
        Copyright © 2025 All Rights Reserved By Jayant.
      </div>
    </>
  )
}
export default Footer
