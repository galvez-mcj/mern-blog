import { useContext, useEffect } from "react";
import { Link } from "react-router-dom"
import { UserContext } from "../context/UserContext";

const Navbar = () => {
    const { userInfo, setUserInfo } = useContext(UserContext)

    useEffect( () => {
        fetch('http://localhost:5000/profile', {
            credentials: 'include',
        }).then( response => {
            response.json().then( data => {
                setUserInfo(data)
            })
        })
    }, [])

    const logout = () => {
        fetch('http://localhost:5000/logout', {
            method: 'POST',
            credentials: 'include'
        })
        setUserInfo(null)
    }

    const username = userInfo?.username
    
    return (
        <header className="nav-bar">
            <Link to="/" className="logo">My Blog</Link>
            <nav className="nav-items">
                { username && (
                    <>
                        <Link to="/create">Create Blog</Link>
                        <a onClick={logout}>Logout</a>
                    </>
                )}
                { !username && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>

        </header>
    )
}
 
export default Navbar;