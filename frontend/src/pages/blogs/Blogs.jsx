import blogsData from "../../data/blogs.json"

const Blogs = () => {
  return (
    <div id="blogs" className="section__container blog__container">
        <h2 className="section__header">Latest Blogs</h2>
        <p className="section__subheader">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores nemo, nesciunt eos.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-12">
            {blogsData.map((blog) => (
                <div key={blog.id} className="blog__card cursor-pointer hover:scale-105 transition-all duration-300">
                    <div>
                    <img src={blog.imageUrl} alt={blog.title} />
                    </div>
                    
                    <div className="blog__card__content">
                        <h4>{blog.title}</h4>
                        <h6>{blog.subtitle}</h6>
                        <p>{blog.date}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Blogs