import previewImg from "../assets/preview-img.webp"
const BlogPreview = () => {
  return (
    <div className="blog-preview">
      <img src={previewImg} alt="" className="blog-img"/>
      <div className="content">
        <h1>Header Here</h1>
        <div className="info">
            <a href="" className="blog-author">Tinay Galvez</a>
            <time>April 3, 2023 | 8:38 PM</time>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum quia iusto, velit eligendi vero nulla ea incidunt nostrum doloribus obcaecati! Unde blanditiis ea veniam maiores perspiciatis accusamus autem omnis architecto.</p>
      </div>
    </div>
  )
}

export default BlogPreview
