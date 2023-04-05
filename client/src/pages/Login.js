import { Link, Navigate } from "react-router-dom"
import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const { setUserInfo } = useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = { username, password }

    const response = await fetch('https://mern-backend-gk2t.onrender.com/login', {
      method: 'POST',
      headers: {
        "Access-Control-Allow-Origin": "https://thebloggers.netlify.app/",
        "Access-Control-Allow-Methods": "GET, POST, OPTION",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user), // should omit
      credentials: 'include'
    })

    if (response.status !== 200) {
      alert('Wrong credentials')
    } else {
      alert('Login Successful')
      response.json().then(userInfo => {
        setUserInfo(userInfo)
        setRedirect(true)
      })
    }

  }

  if (redirect) {
    return <Navigate to={'/'} />
  }


  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
      <input 
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className={(username && password) ? "btn" : "btn dis"}
          disabled={(!username && !password)}>
          Login
        </button>
      </form>
      <div className="login-text">
        No account yet? <Link to="/register">Register Now!</Link>
      </div>
    </div>
  )
}

export default Login
