import { useEffect, useState } from "react"
import BlogPreview from "../components/BlogPreview"

const Home = () => {
  const [posts, setPosts] = useState([])

  useEffect( () => {
    fetch('http://localhost:5000/posts', {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTION",
        "Content-Type": "application/json"
     }
    })
      .then(response => {
        response.json()
          .then(posts => {
            setPosts(posts)
          })
      })
  }, [])

  return (
    <div className="home-page">
      { posts.length > 0 && posts.map(post => (
        <BlogPreview key={post._id} {...post}/>
      ))}
    </div>
  )
}

export default Home
