import { useState } from "react"
import { Link } from "react-router-dom"

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = { username, password }

    fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }).then( () => {
      console.log('new user registered.')
    }).catch( err => {
      setError(err.message)
    })
  }

  return (
    <div className="register-page">
      <h2>Register</h2>
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
        <input
          type="password"
          placeholder="confirm password"
          value={confPassword}
          onChange={(e) => setConfPassword(e.target.value)}
        />
        { confPassword && 
          password !== confPassword && 
          <p className="error-container">
            Error: Passwords don't match
          </p>
        }
        <button
          className={(confPassword && password === confPassword)
                      ? "btn" : "btn dis"}>
          Register
        </button>
        { error && 
            <div className="error-container">
                <b>Error:</b> { error }
            </div>
        }
      </form>
      <div className="register-text">
        Already have an account? <Link to="/login">Login!</Link>
      </div>
    </div>
  )
}

export default Register
