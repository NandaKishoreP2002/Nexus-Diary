import './Navbar.css';
import { NavLink } from 'react-router-dom';
function Navbar(...props) {
    return (
        <div className="nav">
            <NavLink to="/"><img alt="logo" className="nav-pic" src="logo.jpg"></img></NavLink>
            <NavLink activeClassName="nav-active" exact className="nav-link" to="/">Home</NavLink>
            <NavLink activeClassName="nav-active" className="nav-link" to="/create">New Entry</NavLink>
            <NavLink activeClassName="nav-active" className="nav-link" to="/view">Collection</NavLink>
            <button className="nav-button" onClick={props[0].logout}>LogOut</button>
        </div>
    )
}
export default Navbar;