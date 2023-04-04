import { useState } from "react"
import { Navigate } from "react-router-dom"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'

const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
        ],
        ['link', 'image'],
        ['clean'],
      ]
}


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

        const response = await fetch('http://localhost:5000/post', {
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
            <ReactQuill 
                value={content}
                onChange={(newVal) => setContent(newVal)}
                modules={modules}/>
            <button className="btn">Create Post</button>
        </form>
        </div>
    )
}

export default Create
