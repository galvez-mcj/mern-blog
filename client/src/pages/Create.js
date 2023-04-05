import { useState } from "react"
import { Navigate } from "react-router-dom"
import ContentEditor from "../components/ContentEditor"

const Create = () => {
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState('')
    const [redirect, setRedirect] = useState(false)

    const handleSubmit = async (e) => {
        const data = new FormData()
        data.set('title', title)
        data.set('summary', summary)
        data.set('content', content)
        data.set('file', files[0])

        e.preventDefault()

        const response = await fetch('https://mern-backend-gk2t.onrender.com/post', {
            headers: {
                "Access-Control-Allow-Origin": "https://thebloggers.netlify.app/",
                "Access-Control-Allow-Methods": "GET, POST, OPTION",
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: data,
            credentials: 'include'
        })

        if (response.ok) {
            alert('New blog successfully created.')
            setRedirect(true)
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
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
            <button className="btn">Create Post</button>
        </form>
        </div>
    )
}

export default Create
