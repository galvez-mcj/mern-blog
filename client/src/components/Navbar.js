import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <header className="nav-bar">
            <Link to="/" className="logo">My Blog</Link>
            <nav className="nav-items">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </nav>

        </header>
    )
}
 
export default Navbar;