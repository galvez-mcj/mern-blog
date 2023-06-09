import { useContext, useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { format } from "date-fns"
import { UserContext } from "../context/UserContext"

const BlogDetails = () => {
    const [postInfo, setPostInfo] = useState(null)
    const { userInfo } = useContext(UserContext)
    const { id } = useParams()

    useEffect( () => {
        fetch(`https://mern-backend-gk2t.onrender.com/${id}`, {
            headers: {
                "Access-Control-Allow-Origin": "https://thebloggers.netlify.app/",
                "Access-Control-Allow-Methods": "GET, POST, OPTION",
                "Content-Type": "application/json"
             }
        })
            .then( response => {
                response.json().then( postInfo => {
                    setPostInfo(postInfo)
                })
            })
    }, [])
    
    if (!postInfo) return ''

    return (
        <div className="blog-details">
            <h1>{ postInfo.title }</h1>
            <div className="author">
                by @{postInfo.author.username} | <span><time>{ format(new Date(postInfo.createdAt), 'MMM dd, yyyy HH:mm') }</time></span>
            </div>
            { userInfo.id === postInfo.author._id && (
                <div className="edit-blog">
                    <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                        Edit Post
                    </Link>
                </div>
            )}
            <div className="image">
                <img src={`http://localhost:5000/${postInfo.cover}`} alt=""/>
            </div>
            <div
                className="content"
                dangerouslySetInnerHTML={{__html:postInfo.content}}
            />
        </div>
    )
}

export default BlogDetails
