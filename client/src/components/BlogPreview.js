import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { format } from "date-fns"

const BlogPreview = ({ title, summary, cover, createdAt, author }) => {
  return (
    <div className="blog-preview">
      <img src={`http://localhost:5000/${cover}`} alt="" className="blog-img"/>
      <div className="content">
        <h1>{ title }</h1>
        <div className="info">
            <a href="" className="blog-author">{ author.username }</a>
            <time>{ format(new Date(createdAt), 'MMM dd, yyyy HH:mm') }</time>
        </div>
        <p>{ summary }</p>
      </div>
    </div>
  )
}

export default BlogPreview
