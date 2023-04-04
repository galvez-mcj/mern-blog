import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { format } from "date-fns"
import { Link } from "react-router-dom"

const BlogPreview = ({ _id, title, summary, cover, createdAt, author }) => {
  return (
    <div className="blog-preview">
      <Link to={`/post/${_id}`}>
        <img src={`http://localhost:5000/${cover}`} alt="" className="blog-img"/>
      </Link>
      <div className="content">
        <Link to={`/post/${_id}`}>
          <h1>{ title }</h1>
        </Link>
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
