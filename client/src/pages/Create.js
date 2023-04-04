import { useState } from "react"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'

const Create = () => {

    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [body, setBody] = useState('')

    return (
        <div className="create-page">
        <h2>Create Post</h2>
        <form className="create-form">
            <input 
                type="text"
                placeholder="Title"
            />
            <input 
                type="text"
                placeholder="Summary"
            />
            <input 
                type="file"
            />
            <ReactQuill />
            <button className="btn">Create Post</button>
        </form>
        </div>
    )
}

export default Create
