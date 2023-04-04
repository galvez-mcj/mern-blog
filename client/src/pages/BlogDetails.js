import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { format } from "date-fns"

const BlogDetails = () => {
    const [postInfo, setPostInfo] = useState(null)
    const { id } = useParams()

    useEffect( () => {
        fetch(`http://localhost:5000/post/${id}`)
            .then( response => {
                response.json().then( postInfo => {
                    setPostInfo(postInfo)
                })
            })
    }, [])
    
    if (!postInfo) return ''

    return (
        <div className="blog-details">
            <img src={`http://localhost:5000/${postInfo.cover}`} alt="" className="blog-img" />
            <h1>{ postInfo.title }</h1>
            <time>{ format(new Date(postInfo.createdAt), 'MMM dd, yyyy HH:mm') }</time>
            <div className="author">
                by @{postInfo.author.username}
            </div>
            <div
                className="content"
                dangerouslySetInnerHTML={{__html:postInfo.content}}
            />
        </div>
    )
}

export default BlogDetails
