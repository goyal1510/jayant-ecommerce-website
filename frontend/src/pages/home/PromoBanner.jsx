const PromoBanner = () => {
  return (
    <section className="section__container banner__container">
      {[
        { icon: "ri-truck-line", title: "Free Delivery", text: "Enjoy hassle-free shipping on all orders." },
        { icon: "ri-money-dollar-circle-line", title: "100% Money Back Guarantee", text: "Full refund if you're not satisfied with your purchase." },
        { icon: "ri-user-voice-line", title: "Strong Support", text: "24/7 customer service to assist you anytime." },
      ].map((item, index) => (
        <div key={index} className="banner__card">
          <span><i className={item.icon}></i></span>
          <h4>{item.title}</h4>
          <p>{item.text}</p>
        </div>
      ))}
    </section>
  );
};

export default PromoBanner;