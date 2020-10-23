import React from "react";
import { NavLink, Link } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";
import { Icon } from "semantic-ui-react";

import "../styles/NavMain.css";

const NavMain = (props) => {
  const { context } = props;

  function handleLogout() {
    apiHandler
      .logout()
      .then(() => {
        context.removeUser();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <nav className="NavMain">
      <Link style={{ color: "white" }} to="/">
        <h3 className="logo">What's Up Paris</h3>
      </Link>

      <ul className="nav-list">
        <React.Fragment>
          <li>
            <NavLink style={{ color: "white" }} to="/all-users">
              <Icon size="large" name="users" />
            </NavLink>
          </li>
          <li>
            <NavLink style={{ color: "white" }} to="/all-events">
              <Icon size="large" name="images" />
            </NavLink>
          </li>

          {context.isLoggedIn && (
            <li>
              <NavLink style={{ color: "white" }} to="/add-event">
                <Icon size="large" name="plus square" />
              </NavLink>
            </li>
          )}
        </React.Fragment>
      </ul>

      <ul className="nav-list">
        {context.isLoggedIn && (
          <React.Fragment>
            {context.user.role === 'admin' && (
            <li>
              <NavLink style={{ color: "white" }} to="/Admin">
                Dashboard
              </NavLink>
            </li>
            )}
            <li>
              <NavLink style={{ color: "white" }} to="/profile">
                {/* {context.user && context.user.email} */}
                My Profile
              </NavLink>
            </li>
            <li>
              <p onClick={handleLogout}>Logout</p>
            </li>
          </React.Fragment>
        )}
        {!context.isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink style={{ color: "white" }} to="/signin">
                Log in
              </NavLink>
            </li>
            <li>
              <NavLink style={{ color: "white" }} to="/signup">
                Create account
              </NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default withUser(NavMain);
