import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { format } from "date-fns"

const BlogPreview = ({ title, summary, cover, createdAt }) => {
  return (
    <div className="blog-preview">
      <img src={cover} alt="" className="blog-img"/>
      <div className="content">
        <h1>{ title }</h1>
        <div className="info">
            <a href="" className="blog-author">Tinay Galvez</a>
            <time>{ format(new Date(createdAt), 'MMM dd, yyyy HH:mm') }</time>
        </div>
        <p>{ summary }</p>
      </div>
    </div>
  )
}

export default BlogPreview
