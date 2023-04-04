import { Link } from "react-router-dom"
import { useState } from "react"

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form>
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
          className={(username && password) ? "btn" : "btn dis"}>
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
