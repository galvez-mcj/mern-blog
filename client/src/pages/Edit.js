import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import ContentEditor from "../components/ContentEditor"

const Edit = () => {
    const { id } = useParams()
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState('')
    const [redirect, setRedirect] = useState(false)
    
    useEffect( () => {
        fetch(`https://mern-backend-gk2t.onrender.com/post/${id}`, {
            headers: {
                "Access-Control-Allow-Origin": "https://thebloggers.netlify.app/",
                "Access-Control-Allow-Methods": "GET, POST, OPTION",
                "Content-Type": "application/json"
             }
        })
            .then( response => {
                response.json().then( postInfo => {
                    setTitle(postInfo.title)
                    setSummary(postInfo.summary)
                    setContent(postInfo.content)
                })
            })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = new FormData()
        data.set('title', title)
        data.set('summary', summary)
        data.set('content', content)
        data.set('id', id)
        if (files?.[0]) {
            data.set('file', files?.[0])
        }

        const response = await fetch('https://mern-backend-gk2t.onrender.com/post/', {
            headers: {
                "Access-Control-Allow-Origin": "https://thebloggers.netlify.app/",
                "Access-Control-Allow-Methods": "GET, POST, OPTION",
                "Content-Type": "application/json"
            },
            method: 'PUT',
            body: data,
            credentials: 'include'
        })

        if (response.ok) {
            setRedirect(true)
        }
    }

    if (redirect) {
        return <Navigate to={`/post/${id}`} />
    }

    return (
        <div className="create-page">
        <h2>Create Post</h2>
        <form className="create-form" onSubmit={handleSubmit}>
            <input 
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input 
                type="text"
                placeholder="Summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
            />
            <input 
                type="file"
                onChange={(e) => setFiles(e.target.files)}
            />
            <ContentEditor 
                value={content}
                onChange={setContent}/>
            <button className="btn">Update Post</button>
        </form>
        </div>
    )
}

export default Edit
