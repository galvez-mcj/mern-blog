import { Link } from "react-router-dom"

const Register = () => {
  return (
    <div className="register-page">
      <h2>Register</h2>
      <form>
        <input 
          type="text"
          placeholder="username"
        />
        <input
          type="password"
          placeholder="password"
        />
        <input
          type="password"
          placeholder="confirm password"
        />
        <button>Register</button>
      </form>
      <div className="register-text">
        Already have an account? <Link to="/login">Login!</Link>
      </div>
    </div>
  )
}

export default Register
