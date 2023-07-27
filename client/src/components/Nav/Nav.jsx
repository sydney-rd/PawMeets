import { NavLink } from "react-router-dom";
import logo from "../../assets/Logo/PawMeets-1.png"
import "./Nav.css";

function Nav() {
  return (
    <>
      <div className="nav-container">
        <nav className="nav">
        
      <div className="navPmLogo"><img src={logo} alt="Logo" /></div>
          <p className="homepage-link">
            <NavLink to="/homepage">Home</NavLink>
          </p>
          <p className="messages-link">
            <NavLink to="/messages">Matches</NavLink>
          </p>
          <p className="create-profile-link">
            <NavLink to="/profile">Profile</NavLink>
          </p>
          <p className="signout-link">
            <NavLink to="/sign-out">Sign Out</NavLink>
          </p>
        </nav>
      </div>
    </>
  );
}

export default Nav;