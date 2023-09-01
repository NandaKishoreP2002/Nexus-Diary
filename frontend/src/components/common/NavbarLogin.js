import './Navbar.css';
import { NavLink } from 'react-router-dom';
function Navbar() {
    return (
        <div className="nav">
            <NavLink to="/login"><img alt="logo" className="nav-pic" src="logo.jpg"></img></NavLink>
            <NavLink activeClassName="nav-active" exact className="nav-link" to="/login">Login</NavLink>
            <NavLink activeClassName="nav-active" className="nav-link" to="/register">Register</NavLink>
        </div>
    )
}
export default Navbar;