import { Link } from "react-router-dom"
import { useState } from "react"

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = { username, password }

    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user) // should omit
    })

    if (response.status !== 200) {
      alert('Wrong credentials')
    }

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
