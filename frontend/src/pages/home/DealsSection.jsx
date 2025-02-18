import dealsImg from "../../assets/deals.png"

const DealsSection = () => {
  return (
    <section className="section__container deals__container">
      <div className="deals__image">
        <img src={dealsImg} alt="" />
      </div>
      <div className="deals__content">
        <h5>Get Up To 20% Discount</h5>
        <h4>Deals Of The Month</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione quidem fuga aspernatur deleniti illum, molestias ipsum vero, ad rerum perferendis ea, incidunt praesentium delectus corrupti labore natus? Mollitia, tenetur eos.</p>
        <div className="deals__countdown float-wrap">
          <div className="deals__countdown__card">
            <h4>20</h4>
            <p>Days</p>
          </div>
          <div className="deals__countdown__card">
            <h4>20</h4>
            <p>Hours</p>
          </div>
          <div className="deals__countdown__card">
            <h4>20</h4>
            <p>Mins</p>
          </div>
          <div className="deals__countdown__card">
            <h4>20</h4>
            <p>Secs</p>
          </div>
          
        </div>
      </div>
    </section>
  )
}

export default DealsSection