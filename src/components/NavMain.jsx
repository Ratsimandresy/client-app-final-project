import React from "react";
import {NavLink, Link} from "react-router-dom";
import {withUser} from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";

import "../styles/NavMain.css";

const NavMain = (props) => {
    const {context} = props;

    function handleLogout() {
        apiHandler.logout().then(() => {
            context.removeUser();
        }).catch((error) => {
            console.log(error);
        });
    }

    return (<nav className="NavMain">
        <Link to="/">
            <h3 className="logo">What's Up Paris</h3>
        </Link>

      <ul className="nav-list">
        <React.Fragment>
          <li>
            <NavLink to="/all-users">All Users</NavLink>
          </li>
          <li>
            <NavLink to="/all-events">All Events</NavLink>
          </li>
          <li>
            <NavLink to="/add-event">Add new event</NavLink>
          </li>
        </React.Fragment>
      </ul>

      <ul className="nav-list">
        {context.isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink to="/all-users">
                All Users
              </NavLink>
            </li>
            <li>
              <NavLink to="/all-events">
                All Events
              </NavLink>
            </li>
          </React.Fragment>
        </ul>

        <ul className="nav-list">
          {context.isLoggedIn && (
            <React.Fragment>
              <li>
                <NavLink to="/profile">
                  {context.user && context.user.email}
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
                  <NavLink to="/signin">Log in</NavLink>
              </li>
              <li>
                  <NavLink to="/signup">Create account</NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>
    </nav>
  );
};
export default withUser(NavMain);
