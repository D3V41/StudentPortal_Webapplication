import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <NavLink className="navbar-brand" to="/teacher">
          Teacher
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink eventKey="1" className="nav-link" to="/teacher/results">
                ManageResults
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/teacher/materials">
                ManageMaterial
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/teacher/subjects">
                SubjectList
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/teacher/selectStudent">
                Reporting
              </NavLink>
            </li> */}
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <div className="nav-link">
                Hello, {localStorage.getItem("id")}
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link">
                <a
                  href="http://localhost:3000/"
                  style={{ textDecoration: "none", color: "inherit" }}
                  onClick={() => {
                    localStorage.clear();
                  }}
                >
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
