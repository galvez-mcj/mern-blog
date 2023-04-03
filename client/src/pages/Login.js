import { Link } from "react-router-dom"

const Login = () => {
  return (
    <div className="login-page">
      <h2>Login</h2>
      <form>
      <input 
          type="text"
          placeholder="username"
        />
        <input
          type="password"
          placeholder="password"
        />
        <button>Login</button>
      </form>
      <div className="login-text">
        No account yet? <Link to="/register">Register Now!</Link>
      </div>
    </div>
  )
}

export default Login
